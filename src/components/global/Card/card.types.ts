interface ICardProps {
    code: string;
    capacity: number;
    departureDate: string;
    img?: string;
    id: string;
    onImageClick: () => void;
    onDeleteClick: () => void;
}

export type { ICardProps }