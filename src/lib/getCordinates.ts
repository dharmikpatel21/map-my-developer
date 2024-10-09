import { toast } from "@/components/ui/use-toast";

export const getCoordinates = async (location: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${location}&format=json`
    );

    const coordinatesJson = await response.json();

    if (coordinatesJson && coordinatesJson.length > 0) {
      return coordinatesJson[0];
    } else {
      toast({
        variant: "destructive",
        description: `No coordinates found for location: ${location}`,
      });
      console.warn(`No coordinates found for location: ${location}`);
      return null;
    }
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: `ERROR Fetching coordinates: ${error.message}`,
    });
    console.error("ERROR Fetching coordinates", error.message);
    return null;
  }
};
