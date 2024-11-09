import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleComment=()=>{
    const [errorDeleComment, setError] = useState(null);
    const [isLoadingDeleComment, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const deleComment = async (Type,_id)=>{
        // Check if user exists and has a userID
        if (!user || !user.userID) {
            setError("User is not logged in or user ID is missing");
            return;
        }

        const userEmail = user.email;
        const productId = Type.Id
        const productType = Type.Type
        const commentID =_id
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/api/comment/${userEmail}/${productId}/${productType}/${commentID}`, {
                method: 'DELETE', // Assuming 'DELETE' is the intended method for deletion
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                alert('Successfully deleted the comment');
            }
        } catch (err) {
            setError("An error occurred while deleting the comment");
        } finally {
            setIsLoading(false);
        }
    }
    return { deleComment, isLoadingDeleComment, errorDeleComment };
}