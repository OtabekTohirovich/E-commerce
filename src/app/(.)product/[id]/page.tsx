"use client";

import CustumImage from "@/components/image";
import { ProductType } from "@/interfaces";
import { Dialog } from "@headlessui/react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  const router = useRouter();

  const handleClick = () => {
		const products: ProductType[] =
			JSON.parse(localStorage.getItem('carts') as string) || [];

		const isExistProduct = products.find(c => c.id === product?.id);

		if (isExistProduct) {
			const updatedData = products.map(c => {
				if (c.id === product?.id) {
					return {
						...c,
						quantity: c.quantity + 1,
					};
				}

				return c;
			});

			localStorage.setItem('carts', JSON.stringify(updatedData));
		} else {
			const data = [...products, { ...product, quantity: 1 }];
			localStorage.setItem('carts', JSON.stringify(data));
		}
		toast('Product added to your bag!!');
	};

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setIsLoading(false);
    }
    getData();
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {isLoading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className=" relative w-72 h-full hidden md:inline">
                    <CustumImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className=" font-semibold">{product?.title}</h4>
                    <p className=" font-medium text-sm">${product?.price}</p>

                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          {Array.from(
                            {
                              length: Math.floor(product.rating.rate),
                            },
                            (_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 text-yellow-500"
                              />
                            )
                          )}
                          {Array.from(
                            {
                              length: 5 - Math.floor(product.rating.rate),
                            },
                            (_, i) => (
                              <StarIconOutline
                                key={i}
                                className="h-4 w-4 text-yellow-500"
                              />
                            )
                          )}
                        </div>
                      )}
                      <p className=" text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count} reviews
                      </p>
                    </div>
                    <p className=" line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className=" space-y-3 text-sm">
                    <button onClick={handleClick} className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-transparent. border-blue-600   hover:border-transparent hover:bg-blue-600 hover:text-white"
                    >
                      Wiew full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailsPage;
