"use client";
import { use } from "react";
import { Section } from "widgets/section";
import { MovieItem } from "entities/movie-item";
import { queryClient } from "shared/lib/query-client";
import { getNewMovies } from "./model";

export const New = () => {
  const { docs } = use(queryClient("new", getNewMovies));

  const { SectionTitle, SectionCarousel } = Section;

  return (
    <Section>
      <SectionTitle size="medium">Новые фильмы</SectionTitle>
      <SectionCarousel items={docs} renderItem={(item) => <MovieItem item={item} />} />
    </Section>
  );
};
