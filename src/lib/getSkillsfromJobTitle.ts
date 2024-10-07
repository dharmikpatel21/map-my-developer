export const getSkillsfromJobTitle = async (jobTitle: string) => {
  try {
    // Fetch skills for the specific job title
    const response = await fetch(
      `http://localhost:3001/skills?title=${encodeURIComponent(jobTitle)}`
    );
    const skillsData = await response.json();

    if (skillsData.length > 0) {
      const skills = skillsData[0].skills;
      console.log("Skills for the job title:", jobTitle, skills);
      return skills;
    } else {
      console.log("No skills found for the job title:", jobTitle);
      return [];
    }
  } catch (error: any) {
    console.error("Error fetching skills", error.message);
  }
};
