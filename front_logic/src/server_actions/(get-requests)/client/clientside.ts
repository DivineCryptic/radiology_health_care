import axios from "axios";

export const getRanksByServiceId = async (
  serviceId: number,
  authToken?: any
) => {
  const ranksByIdUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL +
    "/api/ranks?empServiceId.equals=" +
    serviceId;
  const userAuthToken = authToken;

  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(ranksByIdUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Ranks = response.data;
  return Ranks;
};

export const getUnitsByServiceId = async (
  serviceId: number,
  authToken?: any
) => {
  const unitsByIdUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL +
    "/api/units?empServiceId.equals=" +
    serviceId;
  const userAuthToken = authToken;

  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(unitsByIdUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Units = response.data;
  return Units;
};

export const getEquipmentsByClient = async (authToken?: any) => {
  const publicEquipmentsUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL + "/api/equipment";
  const userAuthToken = authToken;
  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(publicEquipmentsUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Equipments = response.data;
  return Equipments;
};


export const getAllPatientsData = async (authToken?: any) => {
  const publicPatientsUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/patient-infos";
  const userAuthToken = authToken;
  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(publicPatientsUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Patients = response.data;
  return Patients;
}


//Test Categories client side requests


export const getChildTestCategories = async( authToken? : any) => {
  const getChildTestCategoriesUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/test-categories?parentTestCategoryId.specified=true";
  
  const userAuthToken = authToken;
  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(getChildTestCategoriesUrl, {
    headers: {
      Authorization: bearerToken
    }
  })
  const ChildTestCategories = response.data 
  return ChildTestCategories
}


