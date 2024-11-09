import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useAddBookMark = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const AddBookMark = async (productId, productType) => { 
        // Check if user exists and has a userID
        if (!user || !user.userID) {
            setError("User is not logged in or user ID is missing");
            return;
        }

        const userId = user.userID;
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/api/bookmarks', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, productId, productType })
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                alert('Added to your list');
            }
        } catch (err) {
            setError("An error occurred while adding the bookmark");
        } finally {
            setIsLoading(false);
        }
    };

    return { AddBookMark, isLoading, error };
};
