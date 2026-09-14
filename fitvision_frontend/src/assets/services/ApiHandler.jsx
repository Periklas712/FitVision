export async function createUser(data){
    const response = await fetch("http://localhost:8080/api/users/createUser",{
        method :"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(response.json.toString);
    return await response.json();
}

export async function createUserWorkoutPlanList(userId){
    const response = await fetch(`http://localhost:8080/api/workoutPlans/createUserWorkoutPlanList?userId=${userId}`, { 
        method : "POST",
        headers: {"Content-Type": "application/json"},
    });
    if (!response.ok) throw new Error(response.json.toString);
    return await response.json();
}

export async function getEnums(){
   try{
    const response = await fetch("http://localhost:8080/api/enums/allEnums");
    if (!response.ok){
        throw  new Error("Failed to fetch enums");

    }

    const data = await response.json();
    return data;
   }catch (error){
    console.log("Error fething enums: ", error);
   }
};

