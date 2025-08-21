# Use the API response and error classes to the project 
```ts
    import { ApiResponses } from "../utils/ApiResponses";
    import { ApiError } from "../utils/ApiError"; // the error class we built earlier

    async getPaymentsByOwner(ownerId: number): Promise<ApiResponses<Payment[]>> {
    try {
        const ownerApartments = await this.getApartments(ownerId);

        if (ownerApartments.length === 0) {
        return new ApiResponses<Payment[]>(404, [], "No apartments found for this owner");
        }

        const apartmentIds = ownerApartments.map(apt => apt.id);
        const paymentsList = await db
        .select()
        .from(payments)
        .where(inArray(payments.apartmentId, apartmentIds));

        return new ApiResponses<Payment[]>(200, paymentsList, "Payments fetched successfully");

    } catch (err) {
        // If unexpected error -> wrap inside ApiError or ApiResponses
        if (err instanceof ApiError) {
        return new ApiResponses<Payment[]>(err.statusCode, [], err.message);
        }
        return new ApiResponses<Payment[]>(500, [], "Internal Server Error");
    }
    }
```