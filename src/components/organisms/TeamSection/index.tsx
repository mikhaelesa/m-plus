"use client";

import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Tagline } from "@/components/molecules/Tagline";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function TeamSection() {
  const teamMembers = [
    {
      name: "Marcus Vane",
      role: "Chief Data Officer",
      description:
        "Expert in vPIC dataset integration and manufacturing trend analysis, driving data-first decisions across the platform.",
      facebook: "#",
      instagram: "#",
      x: "#",
      image: "https://i.pravatar.cc/150?u=marcus",
    },
    {
      name: "Lydia Chen",
      role: "Head of Product",
      description:
        "Focused on building intuitive analytics tools that make global vehicle data accessible and actionable for every user.",
      facebook: "#",
      instagram: "#",
      x: "#",
      image: "https://i.pravatar.cc/150?u=lydia",
    },
    {
      name: "Daniel Frost",
      role: "Lead Backend Engineer",
      description:
        "Architects the high-performance data pipelines that power real-time vPIC synchronization and analytics at scale.",
      facebook: "#",
      instagram: "#",
      x: "#",
      image: "https://i.pravatar.cc/150?u=daniel",
    },
    {
      name: "Priya Sharma",
      role: "UX Designer",
      description:
        "Crafts seamless dashboard experiences that transform complex automotive datasets into clear, beautiful visualizations.",
      facebook: "#",
      instagram: "#",
      x: "#",
      image: "https://i.pravatar.cc/150?u=priya",
    },
    {
      name: "James Ortega",
      role: "Data Analyst",
      description:
        "Uncovers hidden patterns in global WMI and manufacturer data, delivering insights that keep our users ahead of market trends.",
      facebook: "#",
      instagram: "#",
      x: "#",
      image: "https://i.pravatar.cc/150?u=james",
    },
    {
      name: "Elena Kovacs",
      role: "Automotive Domain Expert",
      description:
        "Brings deep industry knowledge to validate our analytics models and ensure data accuracy across all vehicle classifications.",
      facebook: "#",
      instagram: "#",
      x: "#",
      image: "https://i.pravatar.cc/150?u=elena",
    },
  ];

  return (
    <section id="team" className="bg-background section-padding-y">
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          <div className="section-title-gap-lg flex max-w-xl flex-col items-center text-center">
            <Tagline>The Experts</Tagline>
            <h2 className="heading-lg text-foreground">
              Driven by Automotive Data Specialists
            </h2>
            <p className="text-muted-foreground">
              Our team of data scientists and automotive experts are dedicated
              to making global vehicle information accessible and actionable.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {teamMembers.map((member, index) => (
              <div
                key={String(index)}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-xl">
                    <AvatarImage src={member.image} alt={member.name} />
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-foreground text-base font-semibold">
                      {member.name}
                    </p>
                    <p className="text-muted-foreground text-base">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-base">
                  {member.description}
                </p>
                <div className="flex gap-4">
                  <Link
                    href={member.facebook}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    <SiFacebook className="size-6" />
                  </Link>
                  <Link
                    href={member.x}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    <SiInstagram className="size-6" />
                  </Link>
                  <Link
                    href={member.x}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    <SiX className="size-6" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
