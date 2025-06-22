import { SimpleGrid } from "@mantine/core";

import { JSX } from "react";
import FeatureCard from "./FeatureCard";

interface FeatureCardListProps {
  items: {
    icon: JSX.Element;
    title: string;
    subtitle: string;
  }[];
}

export default function FeatureCardList({ items }: FeatureCardListProps) {
  return (
    <SimpleGrid cols={4} spacing="xl">
      {items.map((item, index) => {
        return (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        );
      })}
    </SimpleGrid>
  );
}
