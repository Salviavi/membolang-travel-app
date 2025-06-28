"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { get } from "react-hook-form";
import { Button } from "@/components/ui/button";

// POP UP MODAL

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// FORM

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/fileupload";

// end form //

// Scroll form
import { ScrollArea } from "@/components/ui/scroll-area";
//

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getToken } from "@/utilities/utils";

const formSchema = z.object({
  categoryId: z.string(),
  title: z.string().min(1),
  description: z.string(),
  imageUrls: z.string(),
  price: z.string(),
  price_discount: z.string(),
  rating: z.string(),
  total_reviews: z.string(),
  facilities: z.string(),
  address: z.string(),
  province: z.string().min(1),
  city: z.string().min(1),
  location_maps: z.string(),
});

const ManageActivity = () => {
  const [activitiesData, setActivitiesData] = useState([]);
  const [token, setToken] = useState("");
  const [optionCategories, setOptionCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // FORM

  const [files, setFiles] = useState(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      imageUrls: "",
      price: "",
      price_discount: "",
      rating: "",
      total_reviews: "",
      facilities: "",
      address: "",
      province: "",
      city: "",
      location_maps: "",
    },
  });

  // console.log(form.getValues());

  // function CLOSE dialog

  const handleCloseDialog = () => {
    form.reset();
    setFiles([]);
    setDialogOpen(false);
  };

  async function onSubmit(values) {
    try {
      console.log(values);
      console.log(files);
      let fileUrl = [];
      if (files.length > 0) {
        for (const file of files) {
          let data = new FormData();
          data.append("image", file);

          await axios
            .post(
              `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image`,
              data,
              {
                headers: {
                  apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              // masuk then jika HTTP code = 200

              if (response.data.code !== "200") {
                throw response;
              }

              if (response.data.url) {
                fileUrl.push(response.data.url);
              }
            })
            .catch((err) => {
              // jika HTTP != 200
            });
        }
      }

      await axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity`,
          {
            categoryId: values.categoryId,
            title: values.title,
            description: values.description,
            imageUrls: fileUrl,
            price: values.price ? parseInt(values.price) : 0,
            price_discount: values.price_discount
              ? parseInt(values.price_discount)
              : 0,
            rating: values.rating ? parseInt(values.rating) : 0,
            total_reviews: values.total_reviews
              ? parseInt(values.total_reviews)
              : 0,
            facilities: values.facilities,
            address: values.address,
            province: values.province,
            city: values.city,
            location_maps: values.location_maps,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // masuk then jika HTTP code = 200
          console.log(response);

          if (response.data.code !== "200") {
            throw response;
          }

          getActivities();
          handleCloseDialog();
          setDialogOpen(false);
          alert("Berhasil membuat data!");
        })
        .catch((err) => {
          // jika HTTP != 200
          alert(err.response?.data?.message || "Gagal membuat data!");
        });
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  // END FORM

  // GET CATEGORY

  const getCategories = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((response) => {
        setOptionCategories(response?.data?.data || []);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  /* READ Activities */

  const getActivities = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((response) => {
        setActivitiesData(response?.data?.data || []);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  /* READ Activities */

  /* CREATE Activities */

  /* DELETE Activities */

  const handleDelete = (id) => {
    // console.log(id);
    if (!id || !token) {
      return;
    }
    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // masuk then jika HTTP code = 200
        console.log(response);

        if (response.data.code !== "200") {
          throw response;
        }

        getActivities();
        alert("Berhasil menghapus data!");
      })
      .catch((err) => {
        // jika HTTP != 200
        alert(err.response?.data?.message || "Gagal menghapus data!");
      });
  };

  useEffect(() => {
    getActivities();
    getCategories();
    getToken()
      .then((token) => setToken(token))
      .catch(() => {
        setToken("");
      });
  }, []);

  return (
    <div>
      <h1>Ini activity</h1>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-blue-400 hover:bg-blue-600"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Add New Activity
        </Button>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
          }}
        >
          <DialogContent>
            <DialogTitle>Create New Activity</DialogTitle>
            <ScrollArea className="h-[600px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3 max-w-3xl py-4"
                >
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categories</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {optionCategories.map((item, index) => (
                              <SelectItem key={index} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama Activity"
                            type="text"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan deskripsi"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrls"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Activity</FormLabel>
                        <FormControl>
                          <FileUploader
                            value={files}
                            onValueChange={setFiles}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                          >
                            <FileInput
                              id="fileInput"
                              className="outline-dashed outline-1 outline-slate-500"
                              accept="image/*"
                            >
                              <div className="flex items-center justify-center flex-col p-8 w-full ">
                                <CloudUpload className="text-gray-500 w-10 h-10" />
                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>
                                  &nbsp; or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF
                                </p>
                              </div>
                            </FileInput>
                            <FileUploaderContent>
                              {files &&
                                files.length > 0 &&
                                files.map((file, i) => (
                                  <FileUploaderItem key={i} index={i}>
                                    <Paperclip className="h-4 w-4 stroke-current" />
                                    <span>{file.name}</span>
                                  </FileUploaderItem>
                                ))}
                            </FileUploaderContent>
                          </FileUploader>
                        </FormControl>
                        <FormDescription>
                          Anda boleh memilih lebih dari 1 gambar
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan harga"
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price_discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diskon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan diskon"
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan rating"
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="total_reviews"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Review</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan total review"
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fasilitas</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan jenis fasilitas"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan alamat"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan provinsi"
                            type="text"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kota</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan kota"
                            type="text"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location_maps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lokasi Map</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan lokasi"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Masukkan link iFrame untuk lokasi
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {activitiesData.map((item, index) => (
          <div
            key={index}
            className="col-span-12 md:col-span-6 lg:col-span-3 border p-6 rounded-lg bg-blue-100 cursor-pointer"
          >
            <Link href={`/dashboard/manage-activity/${item.id}`}>
              <h1>{item.name}</h1>
              <img src={item.imageUrls} alt={item.name} />
              <h1>{item.description}</h1>
            </Link>
            <div className="pt-6 grid grid-cols-2 gap-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-500 hover:bg-blue-700">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-red-400 hover:bg-red-700">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(item.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageActivity;
