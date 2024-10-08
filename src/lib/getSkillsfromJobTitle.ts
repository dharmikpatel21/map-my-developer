import { toast } from "@/components/ui/use-toast";
import jsonData from "../../db.json";
export const getSkillsfromJobTitle = async (jobTitle: string) => {
  try {
    const skillsDataFiltered = jsonData.skills.filter(
      (skill) => skill.title === jobTitle
    );

    if (skillsDataFiltered.length > 0) {
      const skills = skillsDataFiltered[0].skills;
      console.log("Skills for the job title:", jobTitle, skills);
      return skills;
    } else {
      toast({
        variant: "destructive",
        description: `No skills found for the job title: ${jobTitle}`,
      });
      console.log("No skills found for the job title:", jobTitle);
      return [];
    }
  } catch (error: any) {
    toast({
      variant: "destructive",
      description: `Error processing skills data": ${error.message}`,
    });
    console.error("Error processing skills data", error.message);
  }
};
