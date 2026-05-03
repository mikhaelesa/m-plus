"use client";

import Image from "next/image";
import Link from "next/link";
import { Tagline } from "@/components/molecules/Tagline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useGSAPAnimation } from "./useGSAPAnimation";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Understanding the vPIC Dataset: A Deep Dive",
    description:
      "Explore the architecture and importance of the NHTSA vPIC dataset for global automotive tracking and manufacturer identification.",
    date: "Mar 15, 2024",
    category: "Data",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Global Manufacturing Trends in 2024",
    description:
      "Analyze how WMI distribution data reveals shifting manufacturing hubs and what it means for the global vehicle supply chain.",
    date: "Mar 12, 2024",
    category: "Trends",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Rise of Electric Vehicle Makes",
    description:
      "How new EV-focused manufacturers are disrupting traditional WMI registration patterns and reshaping the automotive landscape.",
    date: "Mar 8, 2024",
    category: "Insights",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "From Raw Data to Actionable Intelligence",
    description:
      "How the M+ dashboard transforms millions of vPIC records into clear visualizations your team can act on immediately.",
    date: "Mar 5, 2024",
    category: "Product",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
];

export function BlogSection() {
  const { containerRef } = useGSAPAnimation();

  return (
    <section
      id="insights"
      ref={containerRef}
      className="bg-background section-padding-y overflow-hidden"
      aria-labelledby="blog-heading"
    >
      <div className="container-padding-x container mx-auto gap-10 md:gap-12">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Section Title */}
          <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="blog-tagline">
              <Tagline>Insights</Tagline>
            </div>

            {/* Mengganti id untuk SplitText */}
            <h2 id="blog-heading" className="heading-lg">
              Automotive Intelligence &amp; Trends
            </h2>

            <p id="blog-desc" className="text-muted-foreground">
              Stay updated with the latest trends in global vehicle
              manufacturing and data analytics straight from our team of
              experts.
            </p>
          </div>

          {/* Blog Grid */}
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4"
            role="list"
          >
            {BLOG_POSTS.map((post) => (
              <Link href="#" key={post.id} className="blog-card group block">
                {/* Blog Card */}
                <div className="flex flex-col gap-4 rounded-xl transition-all duration-200">
                  {/* Image Wrapper */}
                  <AspectRatio
                    ratio={4 / 3}
                    className="overflow-hidden rounded-xl"
                  >
                    <Image
                      src={post.image}
                      alt={`${post.title} thumbnail`}
                      fill
                      className="blog-image h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>

                  {/* Post Content */}
                  <div className="flex flex-col gap-3">
                    {/* Post Meta */}
                    <div className="flex items-center gap-2 text-left">
                      <span className="text-muted-foreground text-sm">
                        {post.date}
                      </span>
                      <span className="text-muted-foreground text-sm">·</span>
                      <span className="text-muted-foreground text-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-base leading-normal font-semibold group-hover:underline">
                      {post.title}
                    </h3>

                    {/* Post Summary */}
                    <p className="text-muted-foreground text-sm leading-normal">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
