interface IFlightPayload {
    code: string;
    capacity: number;
    departureDate: string;
    photo?: string;
}

interface IFlightsResponse {
    total: number;
    count: number;
    resources: IFlight[];
}

interface IFlight {
    id: string;
    code: string;
    capacity: number;
    departureDate: string;
    img?: string;
    status: string;
}

interface IFlightsParams {
    page: number;
    size: number;
    code: string;
}

export type { IFlightPayload, IFlight, IFlightsResponse, IFlightsParams };