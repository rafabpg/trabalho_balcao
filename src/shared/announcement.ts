export interface Ad {
    id: string;
    title: string;
    description: string;
    price: number;
    status: string;
    kind: string;
    category: string;
    campus: string;
    phone_contact: string;
    email_contact: string;
    created_at: string;
    updated_at: string;
    images_urls: string[];
    user: {
      id: string;
      full_name: string;
      rating: number;
    };
  }