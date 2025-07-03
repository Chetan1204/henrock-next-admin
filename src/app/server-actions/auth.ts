"use server";

export async function loginUser({ email, password }:{ email:string, password:string }): Promise<{ success: boolean; message: string,data:any }> {
    try {
        console.log({ email, password });
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/parent/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ mobile:email, password }),
        });
        const result = await response.json();
        return { success: true, message: result.message || "Login successful" ,data:result};
    } catch (err) {
        console.error("Error during login:", err);
        return { success: false, message: "Login failed",data:'' };
    }
}
