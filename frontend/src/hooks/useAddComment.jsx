import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useAddComment=()=> {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    
    const AddComment =async (Type,userComment)=>{
        if (!user || !user.userID) {
            setError("User is not logged in or user ID is missing");
            return;
        }

        
        const userEmail = user.email;
        const productId = Type.Id
        const productType = Type.Type
        
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/api/comment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail, productId, productType,userComment })
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                alert('Added to your comment');
            }
        } catch (err) {
            setError("An error occurred while adding the comment");
        } finally {
            setIsLoading(false);
        }
    }
    return { AddComment, isLoading, error };
}

