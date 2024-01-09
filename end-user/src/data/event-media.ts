export type Description = {
  name: string;
  text: string;
};

export type Service = {
  id: number;
  name: string;
  bgcolor?: string;
};

export const services = [
  {
    id: 1,
    name: "Therapist",
    bgcolor: "bg-[url('/event-media-assets/01.webp')]"
  },
  {
    id: 2,
    name: "Yoga",    
    bgcolor: "bg-[url('/event-media-assets/01.webp')]"

  },
  {
    id: 3,
    name: "Accupressure",
    bgcolor: "bg-[url('/event-media-assets/01.webp')]"
  },
  {
    id: 4,
    name: "Beauty",
    bgcolor: "bg-[url('/event-media-assets/01.webp')]"
  },
  {
    id: 5,
    name: "Hair Salon",
    bgcolor: "bg-[url('/event-media-assets/01.webp')]"
  },
  {
    id: 6,
    name: "Nail Salon",
    bgcolor: "bg-[url('/event-media-assets/01.webp')]"
  }
];
