"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getToken } from "@/utilities/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Select Component

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDraftModeProviderForCacheScope } from "next/dist/server/app-render/work-unit-async-storage.external";

//

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [selectedCard, setSelectedCard] = useState([]);

  // PAYMENT METHOD //

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");

  //

  const fetchCart = async () => {
    const token = await getToken();

    if (!token) {
      return push("/login");
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response?.data?.data);
    } catch (error) {
      console.log("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onToggleSelectedCart = (cartId) => {
    if (cartId) {
      if (selectedCard.some((item) => item === cartId)) {
        setSelectedCard((prev) => prev.filter((value) => value !== cartId));
      } else {
        setSelectedCard((prev) => [...prev, cartId]);
      }
    }
  };

  // TOMBOL CHECKOUT
  const onClickCheckOut = async () => {
    console.log(selectedCard, selectedMethod);

    if (selectedCard.length === 0) {
      return alert("Harap memilih Item di keranjang");
    }

    if (selectedMethod === "") {
      return alert("Harap memilih Payment Method");
    }
    try {
      setLoading(true);
      const token = await getToken();

      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction`,

        {
          cartIds: selectedCard,
          paymentMethodId: selectedMethod,
        },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // return response.data?.code === "200";

      if (response.data.code !== "200") {
        return alert(response.data.message);
      } else {
        setSelectedMethod("");
        setSelectedCard([]);
        // get data keranjang lagi
        await fetchCart();
      }
    } catch (error) {
      return alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // FETCH PAYMENT METHOD

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setPaymentMethods(response.data.data);
      } catch (error) {
        console.error("Failed to fetch payment methods:", error);
      }
    };

    // FETCH CART

    fetchCart();

    // FETCH PAYMENT METHOD
    fetchPaymentMethods();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(selectedCard);

  return (
    <>
      <div>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            setSelectedCard={setSelectedCard}
            checked={selectedCard.includes(item.id)}
          />
        ))}
      </div>

      {/* -- paymentMethods --  */}
      <div>
        <Select
          value={selectedMethod}
          onValueChange={(value) => {
            setSelectedMethod(value);
          }}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Metode Pembayaran" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method.id} value={method.id}>
                <div className="flex items-center gap-2">
                  <img
                    src={method.imageUrl}
                    alt={method.name}
                    className="w-5 h-5"
                  />
                  <span>{method.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button onClick={onClickCheckOut}>Checkout</Button>
      </div>
    </>
  );
};

// const CartItem = ({ item, checked, setSelectedCard }) => {
//   const [quantity, setQuantity] = useState(item.quantity);

//   const onChangeQuantity = (type) => {
//     if (type === "increment") {
//       setQuantity((prev) => prev + 1);
//     } else if (type === "decrement") {
//       setQuantity((prev) => prev - 1);
//     }
//   };

// COMPONENT ITEM CART:

const CartItem = ({ item, checked, setSelectedCard }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [updating, setUpdating] = useState(false);

  // UPDATE CART API //

  const updateCart = async (cartId, quantity) => {
    try {
      const token = await getToken();

      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cartId}`,
        { quantity },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // return response.data?.code === "200";

      if (response.data.code !== "200") {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  //

  const onChangeQuantity = async (type) => {
    let newQuantity = quantity;

    if (type === "increment") {
      newQuantity = quantity + 1;
    } else if (type === "decrement" && quantity > 1) {
      newQuantity = quantity - 1;
    } else {
      return;
    }

    try {
      setUpdating(true);
      const result = await updateCart(item.id, newQuantity);
      if (result === true) {
        setQuantity(newQuantity);
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg shadow-sm">
      <Checkbox
        checked={checked}
        onCheckedChange={(checked) => {
          return checked
            ? setSelectedCard((prev) => [...prev, item.id])
            : setSelectedCard((prev) =>
                prev.filter((value) => value !== item.id)
              );
        }}
      />
      <img
        src={item.activity.imageUrls[0]}
        alt={item.activity.title}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.activity.title}</h3>
        <p className="text-lg font-semibold mt-2">
          Rp.{item.activity.price_discount * item.quantity}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <div className="flex items-center border rounded-md px-2 py-1 mt-4">
          <button
            className="text-gray-500 px-2 text-lg"
            disabled={quantity <= 1 || updating}
            onClick={() => {
              onChangeQuantity("decrement");
            }}
          >
            −
          </button>
          <span className="px-2">{quantity}</span>
          <button
            className="text-gray-500 px-2 text-lg"
            disabled={updating}
            onClick={() => {
              onChangeQuantity("increment");
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
