import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { RootState } from "store";
export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface Media {
    name: string;
    mime?: string;
    height?: number;
    width?: number;
    url: string
    thumbnail?: Thumbnail
}

export interface Thumbnail {
    name: string;
    mime: string;
    width: number;
    height: number;
    url: string
}


export interface MediaAttributes {
    id: number;
    attributes: {
        name: string;
        width: number;
        height: number;
        mime: string;
        url: string;
        formats: {
            thumbnail: Thumbnail
        }

    }
}
export interface MediaResponses  {
  data: MediaAttributes[]
}

export interface MediaResponse  {
    data: MediaAttributes
}


export const mediApi = createApi({
    reducerPath: "mediaApi",
    baseQuery: fetchBaseQuery({
        baseUrl:  process.env.REACT_APP_API_URL,
        prepareHeaders:(headers, { getState}) => {
        const token =
            (getState() as RootState).auth.token || localStorage.getItem("token");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
    
          return headers;
        },

    }),
    tagTypes: ["FormData"],
    endpoints: build => ({
       saveMedia: build.mutation<MediaResponse, Partial<FormData>>({
        query: body => ({
            url: "/api/upload",
            method: "POST",
            body,
            responseHandler: response => response.json()
        })
       }),
       getAllMedia: build.query<MediaResponses, void>({
        query: () => ({
          url: "/api/upload/files",
          method: "GET",
  
          responseHandler: (response) => response.json(),
        }),
      }),

      getMedia: build.query<MediaResponse, void>({
        query: () => ({
          url: "/api/upload/files/:id",
          method: "GET",
  
          responseHandler: (response) => response.json(),
        }),
      }),

      deleteMedia: build.query<MediaResponse, void>({
        query: () => ({
          url: "/api/upload/files/:id",
          method: "DELETE",
  
          responseHandler: (response) => response.json(),
        }),
      }),
    })
});



export const {
  useSaveMediaMutation,
  useGetAllMediaQuery,
  useGetMediaQuery,
  useDeleteMediaQuery
} = mediApi