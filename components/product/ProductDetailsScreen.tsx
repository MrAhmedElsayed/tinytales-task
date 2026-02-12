"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useRef, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Minus,
  Plus,
  Send,
  ShoppingBag,
  Star,
  Twitter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ProductImage = {
  src: string
  alt: string
  extraCount?: number
}

type Review = {
  name: string
  dateLabel: string
  rating: number
  comment: string
}

type SimilarItem = {
  id: string
  src: string
  category: string
  title: string
  price: string
  oldPrice?: string
  rating: string
}

const productImages: ProductImage[] = [
  {
    src: "/images/young-adult-man-wearing-hoodie-beanie 1.png",
    alt: "Man wearing blue hoodie",
  },
  {
    src: "/images/61GoUmCw1PL._AC_SX679_-removebg-preview.png",
    alt: "White hoodie",
  },
  {
    src: "/images/61K-51V+wsL._AC_SX679_-removebg-preview.png",
    alt: "Red hoodie",
  },
  {
    src: "/images/61GoUmCw1PL._AC_SX679_-removebg-preview (1).png",
    alt: "Black hoodie",
    extraCount: 2,
  },
]

const colorOptions = [
  { label: "Red", value: "#e50914" },
  { label: "Blue", value: "#A9C8DE" },
  { label: "Olive", value: "#A99B64" },
  { label: "Sky", value: "#78A5D8" },
  { label: "Gray", value: "#7A7A7A" },
]

const ratingRows = [
  { stars: 5, percent: 67 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 6 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 9 },
]

const reviews: Review[] = [
  {
    name: "Alex Daewn",
    dateLabel: "4 months ago",
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy dolor sit lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
  },
  {
    name: "Alex Daewn",
    dateLabel: "4 months ago",
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy dolor sit lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
  },
  {
    name: "Alex Daewn",
    dateLabel: "4 months ago",
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy dolor sit lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
  },
  {
    name: "Alex Daewn",
    dateLabel: "4 months ago",
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy dolor sit lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
  },
]

const similarItems: SimilarItem[] = [
  {
    id: "1",
    src: "/images/61rjMSPiDvL._AC_SY879_-removebg-preview 1.png",
    category: "Dresses",
    title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free",
    price: "AED 900",
    oldPrice: "AED1300",
    rating: "4.5 (2910)",
  },
  {
    id: "2",
    src: "/images/410555708_236d2355-ef94-45ae-b51b-8d4cfb1cdbf5-removebg-preview 1.png",
    category: "Dresses",
    title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free",
    price: "AED 900",
    oldPrice: "AED1300",
    rating: "4.5 (2910)",
  },
  {
    id: "3",
    src: "/images/128675430_50654237-removebg-preview.png",
    category: "Dresses",
    title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free",
    price: "AED 900",
    oldPrice: "AED1300",
    rating: "4.5 (2910)",
  },
  {
    id: "4",
    src: "/images/360_F_649571437_eo442p0EwFcdkUOoeocbdi7VKl4VWqRP-removebg-preview.png",
    category: "Dresses",
    title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free",
    price: "AED 900",
    oldPrice: "AED1300",
    rating: "4.5 (2910)",
  },
  {
    id: "5",
    src: "/images/61rjMSPiDvL._AC_SY879_-removebg-preview 1.png",
    category: "Dresses",
    title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free",
    price: "AED 900",
    oldPrice: "AED1300",
    rating: "4.5 (2910)",
  },
]

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-[30px] font-semibold leading-none text-[#020202] sm:text-[40px]">
        {title}
      </h2>
    </div>
  )
}

function ProductBanner() {
  return (
    <section className="relative overflow-hidden border-b border-[#ececec] bg-[#f2f2f2]">
      <Image
        src="/images/3d-vertical-background-with-abstract-style 1.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#f2f2f2]/52" />
      <div className="relative mx-auto flex h-[112px] w-full max-w-[1240px] items-center justify-center overflow-hidden px-4 sm:h-[176px]">
        <span className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none whitespace-nowrap text-[80px] font-semibold leading-none text-transparent opacity-50 [text-shadow:0_0_0_#ececec] sm:block">
          Product Details
        </span>
        <h1 className="relative text-[30px] font-semibold leading-none text-[#020202] sm:text-[32px]">
          <span className="sm:hidden">T-shirt</span>
          <span className="hidden sm:block">Product Details</span>
        </h1>
      </div>
    </section>
  )
}

function ProductBreadcrumb() {
  return (
    <div className="mx-auto mt-3 w-full max-w-[1240px] px-4 sm:mt-5">
      <div className="rounded-[12px] border border-[#ececec] bg-[#efefef] px-4 py-[11px]">
        <Breadcrumb>
          <BreadcrumbList className="text-[12px] leading-none text-[#454545]">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard" className="font-medium text-[#020202]">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="font-medium text-[#020202]">
                Our Category
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#666]">
                <span className="sm:hidden">T-shirt</span>
                <span className="hidden sm:inline">Product Details</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}

export function ProductDetailsScreen() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const similarRef = useRef<HTMLDivElement | null>(null)

  const activeImage = productImages[selectedImage]
  const subtotal = useMemo(() => quantity * 300, [quantity])

  const changeImage = (step: number) => {
    setSelectedImage((prev) => {
      const nextIndex = prev + step
      if (nextIndex < 0) return productImages.length - 1
      if (nextIndex >= productImages.length) return 0
      return nextIndex
    })
  }

  const scrollSimilar = (direction: number) => {
    if (!similarRef.current) return
    similarRef.current.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    })
  }

  return (
    <div className="-mt-[64px] min-h-screen bg-[#f5f5f5] pt-[64px] text-[#020202] sm:-mt-[74px] sm:pt-[74px]">
      <ProductBanner />
      <ProductBreadcrumb />

      <div className="mx-auto mt-3 w-full max-w-[1240px] px-4 pb-10 sm:mt-5 sm:pb-16">
        <section className="grid gap-5 lg:grid-cols-[524px_1fr] lg:gap-7">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-[#ececec] bg-[#e7e7e7] lg:h-[565px] lg:w-[524px] lg:rounded-[24px]">
              <div className="absolute left-4 right-4 top-3 z-20 grid grid-cols-4 gap-2 sm:left-5 sm:right-5 sm:top-4 lg:left-6 lg:right-6">
                <span className="h-[6px] rounded-full bg-white/45" />
                <span className="h-[6px] rounded-full bg-white/95" />
                <span className="h-[6px] rounded-full bg-white/45" />
                <span className="h-[6px] rounded-full bg-white/45" />
              </div>

              <Button
                size="icon-sm"
                variant="secondary"
                className="absolute left-3 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 text-[#a8a8a8] hover:bg-white sm:left-4"
                onClick={() => changeImage(-1)}
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                size="icon-sm"
                variant="secondary"
                className="absolute right-3 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-[#bb8f88] text-white hover:bg-[#af8179] sm:right-4"
                onClick={() => changeImage(1)}
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </Button>

              <div className="relative h-[420px] sm:h-[540px] lg:h-[565px]">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(min-width: 1024px) 524px, 100vw"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-2 lg:h-[183px] lg:w-[523px]">
              {productImages.slice(1).map((image, index) => {
                const sourceIndex = index + 1
                const isSelected = selectedImage === sourceIndex
                return (
                  <button
                    key={image.src}
                    className={`relative h-[104px] overflow-hidden rounded-2xl border bg-[#dfdfdf] transition-colors sm:h-[140px] lg:h-[183px] lg:rounded-[24px] ${
                      isSelected ? "border-[#af8076] ring-1 ring-[#af8076]" : "border-[#ececec]"
                    }`}
                    onClick={() => setSelectedImage(sourceIndex)}
                    aria-label={`Select ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 169px, 33vw"
                      className="object-contain p-2 sm:p-3"
                    />
                    {typeof image.extraCount === "number" && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-[34px] font-semibold text-white lg:text-[64px]">
                        +{image.extraCount}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="w-full min-w-0 lg:pt-1">
            <div className="flex items-center justify-between">
              <Badge className="rounded-full border border-[#f0d0ca] bg-[#fff7f6] px-3 py-1 text-[10px] font-medium text-[#c78f86] sm:text-[11px]">
                T-Shirt
              </Badge>
              <div className="flex items-center gap-2">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ececec] text-[#c59a93]"
                  aria-label="Add to bag"
                >
                  <ShoppingBag size={16} />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ececec] text-[#c59a93]"
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} />
                </button>
              </div>
            </div>

            <h3 className="mt-3 text-[16px] font-semibold leading-[1.35] sm:mt-4 sm:text-[22px] sm:leading-[1.3]">
              J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With Blue
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <p className="text-[30px] font-semibold leading-none sm:text-[32px]">$300.00</p>
              <p className="text-[18px] font-medium text-[#9f9f9f] line-through sm:text-[20px]">$360.00</p>
            </div>
            <p className="mt-1 text-[12px] text-[#7c7c7c] sm:text-[13px]">This price is exclusive of taxes.</p>

            <p className="mt-4 border-b border-[#ececec] pb-4 text-[13px] leading-5 text-[#5f5f5f] sm:mt-5 sm:pb-5 sm:text-[15px] sm:leading-6">
              Lorem ipsum dolor sit, consectetur adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, diam nonummy
            </p>

            <div className="mt-4 w-full space-y-2.5 sm:mt-5 sm:space-y-3">
              <div className="w-full lg:max-w-[299px]">
                <label htmlFor="type" className="mb-1 block text-[12px] text-[#8a8a8a] sm:text-[13px]">
                  Type
                </label>
                <select
                  id="type"
                  className="h-[45px] w-full rounded-[10px] border-[0.5px] border-[#ececec] bg-white px-3 text-[13px] outline-none focus:border-[#d8b4ab] sm:text-[14px]"
                  defaultValue="Cotton"
                >
                  <option>Cotton</option>
                  <option>Polyester Blend</option>
                  <option>Linen</option>
                </select>
              </div>

              <div className="w-full lg:max-w-[299px]">
                <label htmlFor="size" className="mb-1 block text-[12px] text-[#8a8a8a] sm:text-[13px]">
                  Size
                </label>
                <select
                  id="size"
                  className="h-[45px] w-full rounded-[10px] border-[0.5px] border-[#ececec] bg-white px-3 text-[13px] outline-none focus:border-[#d8b4ab] sm:text-[14px]"
                  defaultValue="2XL"
                >
                  <option>2XL</option>
                  <option>XL</option>
                  <option>L</option>
                  <option>M</option>
                </select>
              </div>
            </div>

            <div className="mt-4 lg:h-[131px] lg:w-[364px] sm:mt-5">
              <p className="text-[27px] font-semibold leading-none sm:text-[30px]">Colors</p>
              <div className="mt-3 flex items-center gap-2 sm:mt-4 sm:gap-2">
                {colorOptions.map((color, index) => {
                  const active = selectedColor === index
                  return (
                    <button
                      key={color.label}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12 ${
                        active ? "border-[#2f2f2f]" : "border-[#ececec]"
                      }`}
                      onClick={() => setSelectedColor(index)}
                      aria-label={`Select ${color.label}`}
                    >
                      <span
                        className="block h-7 w-7 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  )
                })}
              </div>
              <p className="mt-1 text-center text-[13px] text-[#777] sm:text-left sm:text-[14px]">
                {colorOptions[selectedColor]?.label}
              </p>
            </div>

            <div className="mt-5 border-t border-[#ececec] pt-5 sm:mt-6 sm:pt-6">
              <div className="flex flex-wrap items-end gap-4 lg:gap-5">
                <div className="w-full lg:w-[304px]">
                  <p className="text-[30px] font-semibold leading-none sm:text-[34px]">
                    Quantity <span className="text-[15px] font-normal text-[#8a8a8a] sm:text-[17px]">($300.00 for Piece)</span>
                  </p>

                  <div className="mt-2 flex h-[56px] w-full items-center gap-5">
                    <div className="flex h-[56px] w-[170px] items-center rounded-[12px] bg-[#ececec] px-2">
                      <button
                        className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f5f5f5] text-[#adadad]"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-[70px] text-center text-[56px] font-medium leading-none">
                        {quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f5f5f5] text-[#111]"
                        onClick={() => setQuantity((prev) => Math.min(99, prev + 1))}
                        aria-label="Increase quantity"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <p className="text-[58px] font-semibold leading-none">${subtotal.toFixed(2)}</p>
                  </div>
                </div>

                <Button className="h-[56px] w-full rounded-[12px] bg-[#c29a93] px-8 py-4 text-[17px] font-medium text-white hover:bg-[#b48a83] sm:w-[234px]">
                  Add To Cart
                  <ShoppingBag size={18} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h3 className="text-[29px] font-semibold">
            <span className="relative inline-block">
              Rating & Reviews
              <span className="absolute -bottom-2 left-0 h-[3px] w-14 rounded bg-[#c29a93]" />
            </span>
          </h3>

          <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr_210px] lg:items-center">
            <div className="flex items-end gap-2">
              <p className="text-[84px] font-semibold leading-none">4,5</p>
              <span className="pb-2 text-[38px] text-[#a8a8a8]">/5</span>
            </div>

            <div className="space-y-2">
              {ratingRows.map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span className="flex w-8 items-center gap-1 text-[17px] text-[#9f7f7a]">
                    <Star size={14} className="fill-[#bf9a94] text-[#bf9a94]" />
                    {row.stars}
                  </span>
                  <div className="h-[5px] flex-1 rounded-full bg-[#e5e5e5]">
                    <div
                      className="h-[5px] rounded-full bg-[#bf9a94]"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-[14px] text-[#4f4f4f]">%{row.percent}</span>
                </div>
              ))}
            </div>

            <div className="text-left lg:text-right">
              <p className="text-[20px] text-[#666]">Total Reviews</p>
              <p className="text-[65px] font-semibold leading-none">3.0K</p>
              <Button className="mt-3 h-11 rounded-lg bg-[#c29a93] px-6 text-[15px] text-white hover:bg-[#b48a83]">
                Add Comment
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {reviews.map((review, index) => (
              <article key={`${review.name}-${index}`} className="border-b border-[#e9e9e9] pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-[26px] font-semibold">{review.name}</h4>
                  <span className="text-[13px] text-[#8a8a8a]">{review.dateLabel}</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      className={
                        starIndex < review.rating
                          ? "fill-[#bf9a94] text-[#bf9a94]"
                          : "fill-[#d9d9d9] text-[#d9d9d9]"
                      }
                    />
                  ))}
                </div>
                <p className="mt-3 text-[15px] leading-6 text-[#464646]">{review.comment}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="secondary" className="h-10 rounded-lg bg-[#ececec] px-6 text-[#8f8f8f] hover:bg-[#dfdfdf]">
              View More Comments
            </Button>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader title="Similar Items" />
          <div
            ref={similarRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {similarItems.map((item) => (
              <article
                key={item.id}
                className="min-w-[240px] flex-1 snap-start rounded-2xl border border-[#ececec] bg-white p-3 sm:min-w-[280px]"
              >
                <div className="relative h-[190px] rounded-xl bg-[#f4f4f4]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 640px) 280px, 240px"
                    className="object-contain p-3"
                  />
                  <Badge className="absolute left-2 top-2 bg-[#fff4f2] text-[10px] text-[#c29a93]">
                    25% OFF
                  </Badge>
                </div>

                <p className="mt-3 text-[12px] text-[#8a8a8a]">{item.category}</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="line-clamp-2 text-[14px] font-medium text-[#1f1f1f]">{item.title}</p>
                </div>
                <div className="mt-2 flex items-center gap-1 text-[12px] text-[#8a8a8a]">
                  <Star size={13} className="fill-[#bf9a94] text-[#bf9a94]" />
                  {item.rating}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[13px]">
                  <span className="font-semibold">{item.price}</span>
                  {item.oldPrice ? (
                    <span className="text-[#8a8a8a] line-through">{item.oldPrice}</span>
                  ) : null}
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {colorOptions.slice(0, 3).map((color) => (
                    <span
                      key={`${item.id}-${color.label}`}
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                  <span className="ml-1 text-[12px] text-[#777]">+2</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-[#dfe5ea] text-[#5a5a5a] hover:bg-[#d0d8df]"
              onClick={() => scrollSimilar(-1)}
              aria-label="Previous similar products"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-[#c29a93] text-white hover:bg-[#b48a83]"
              onClick={() => scrollSimilar(1)}
              aria-label="Next similar products"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </section>
      </div>

      <footer className="relative overflow-hidden">
        <Image
          src="/images/kids-photography 1.png"
          alt="Kids background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1f1714]/80" />

        <div className="relative mx-auto grid w-full max-w-[1240px] gap-8 px-4 py-10 text-white sm:grid-cols-2 lg:grid-cols-4 lg:py-12">
          <div>
            <Image
              src="/svg/TT LogoTT Logo 1.svg"
              alt="Tinytales Logo"
              width={66}
              height={51}
              className="h-[46px] w-[58px] invert"
            />
            <p className="mt-4 text-[14px] leading-6 text-white/85">
              Ipsum in eos qui consequatur ab cum maxime. Soluta dolor quae ipsum in eos consequatur ab cum maxime.
            </p>
          </div>

          <div>
            <h4 className="text-[28px] font-semibold">Contact Us</h4>
            <ul className="mt-3 space-y-2 text-[15px] text-white/85">
              <li>+971 01928491</li>
              <li>Named@gmail.com</li>
              <li>381, cairo, egypt</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[28px] font-semibold">Let Us Help</h4>
            <ul className="mt-3 space-y-2 text-[15px] text-white/85">
              <li>My Account</li>
              <li>FAQs</li>
              <li>Contact Us Support</li>
              <li>Categories</li>
              <li>All Products</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[28px] font-semibold">Send Email</h4>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/40 bg-white/12 p-2">
              <Input
                placeholder="Email address"
                className="h-9 border-0 bg-white px-3 text-[#333] placeholder:text-[#9b9b9b] focus-visible:ring-0"
              />
              <Button className="h-9 rounded-md bg-[#c29a93] px-4 text-[14px] text-white hover:bg-[#b48a83]">
                Send
              </Button>
            </div>

            <h5 className="mt-5 text-[18px] font-semibold">Follow Us</h5>
            <div className="mt-3 flex items-center gap-3 text-white">
              <Facebook size={16} />
              <Twitter size={16} />
              <Instagram size={16} />
              <Linkedin size={16} />
              <Send size={16} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
