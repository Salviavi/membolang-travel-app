"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utilities/utils";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";

// accordion component
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
//

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "success":
      return "text-green-600";
    case "failed":
      return "text-red-600";
    case "pending":
      return "text-orange-500";
    default:
      return "text-gray-600";
  }
};

const MyTransaction = () => {
  const [myTransaction, setMyTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    const fetchMyTransaction = async () => {
      const token = await getToken();

      if (!token) {
        return push("/login");
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyTransaction(res?.data?.data);
      } catch (error) {
        console.log("Error fetching activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTransaction();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!myTransaction.length)
    return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <>
      <div className="mx-auto flex justify-center">
        <div className="w-full md:w-[600px]">
          {myTransaction.map((item, index) => (
            <TransactionCard transaction={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

// Transaction Item

const TransactionCard = ({ transaction }) => {
  const {
    payment_method,
    transaction_items,
    totalAmount,
    updatedAt,
    status,
    invoiceId,
    proofPaymentUrl,
  } = transaction;

  const formattedDate = format(new Date(updatedAt), "do MMMM, yyyy");
  const formattedAmount = (totalAmount / 100).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const statusColor = getStatusColor(status);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <Image
          src={transaction_items[0]?.imageUrls[0] || ""}
          alt={transaction_items[0]?.title || "Transaction"}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{invoiceId || "Transaction"}</p>
          <p className={`text-sm ${statusColor} font-medium capitalize`}>
            {status} <span className="text-gray-400 mx-1">•</span>{" "}
            {formattedDate}
          </p>
          <p>
            {proofPaymentUrl
              ? "Sudah Upload Bukti Pembayaran"
              : "Belum Upload Bukti Pembayaran"}
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Lihat Detail</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-4">
                  <Image
                    src={payment_method.imageUrl || ""}
                    alt={payment_method.name || "Payment Method"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p>{payment_method.name}</p>
                    <p>{payment_method.virtual_account_number}</p>
                  </div>
                </div>
                <div>
                  {transaction_items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <Image
                        src={item.imageUrls[0] || ""}
                        alt={item.title || "Transaction Item"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                        <p>{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <p className="font-semibold text-right">{formattedAmount}</p>
    </div>
  );
};

export default MyTransaction;
