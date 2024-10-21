import { IFlight } from "../../../types/flights.types";

interface ITableProps {
    headers: string[];
    data: IFlight[] ;
    onImageClick?: (src: string) => void
    deleteFlight: (id: string) => void
}

export type { ITableProps };

