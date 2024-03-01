import axios from "axios";

const useCountry = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");

    return response;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export { useCountry };
