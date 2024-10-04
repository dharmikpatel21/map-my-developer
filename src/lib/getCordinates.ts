export const getCoordinates = async (city: string) => {
  try {
    const coordinates = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
    );

    const coordinatesJson = coordinates.json();
    return coordinatesJson;
  } catch (error: any) {
    console.log("ERROR Fetching coordinates", error.message);
  }
};
