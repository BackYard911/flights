import {
  IFlight,
  IFlightPayload,
  IFlightsParams,
  IFlightsResponse,
} from "../types/flights.types";
import { del, get, post, put } from "./network";

const getFlights = async (
  params: Partial<IFlightsParams> = { page: 1, size: 10 }
): Promise<IFlightsResponse | null> => {
  const parsedParams: Partial<IFlightsParams> = { page: params.page, size: params.size };

  if (params?.code) {
    parsedParams.code = params?.code;
  }

  try {
    const data: IFlightsResponse = await get("/flights", {
      ...parsedParams,
    });
    return data;
  } catch {
    return null;
  }
};

const createFlight = async (params: IFlightPayload) => {
  try {
    await post("/flights", params);
  } catch (error) {
    return error;
  }
};

const createFlightWithPhoto = async (params: FormData) => {
  try {
    await post(
      "/flights/withPhoto",
      params,
      {
        headers: {
          accept: "*/*",
        },
      },
      true
    );
  } catch (error) {
    return error;
  }
};

const deleteFlight = async (id: string) => {
  try {
    await del(`/flights/${id}`);
  } catch (error) {
    return error;
  }
};

const getFlightById = async (id: string): Promise<IFlight | null> => {
  try {
    const data: IFlight = await get(`/flights/${id}/details`);
    return data;
  } catch {
    return null;
  }
};

const editFlight = async (id: string, params: IFlightPayload) => {
  try {
    await put(`/flights/${id}`, params);
  } catch (error) {
    return error;
  }
}

const editFlightWithPhoto = async (id: string, params: FormData) => {
  try {
    await put(
      `/flights/${id}/withPhoto`,
      params,
      {
        headers: {
          accept: "*/*",
        },
      },
      true
    );
  } catch (error) {
    return error;
  }
}

export {
  getFlights,
  createFlight,
  createFlightWithPhoto,
  deleteFlight,
  getFlightById,
  editFlight,
  editFlightWithPhoto
};
