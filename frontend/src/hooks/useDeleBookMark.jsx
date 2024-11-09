import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleBookMark = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const deleBookMark = async (productId, productType) => {
        // Check if user exists and has a userID
        if (!user || !user.userID) {
            setError("User is not logged in or user ID is missing");
            return;
        }

        const userId = user.userID;
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/api/bookmarks/${userId}/${productId}/${productType}`, {
                method: 'DELETE', // Assuming 'DELETE' is the intended method for deletion
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                alert('Successfully deleted the item');
            }
        } catch (err) {
            setError("An error occurred while deleting the bookmark");
        } finally {
            setIsLoading(false);
        }
    };

    return { deleBookMark, isLoading, error };
};
