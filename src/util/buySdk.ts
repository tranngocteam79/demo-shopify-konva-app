import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
export const client = Client.buildClient({
  domain: "quickstart-811fe53d.myshopify.com",
  storefrontAccessToken: "827ca65af8992cac2cf4417608f90e8f",
  apiVersion: "2022-07",
});

async function addToCartWithDataURL(imageDataUrls: string[]) {
  try {
    const productId = "gid://shopify/Product/7074994716741"; // Replace with your actual product ID
    const variantId = "gid://shopify/ProductVariant/7074994716741"; // Replace with your actual variant ID

    // Add item to cart with custom properties (including image URL)
    const cart = await client.checkout.create();
    await client.checkout.addLineItems(cart.id, [
      {
        quantity: 1,
        variantId: productId,
        customAttributes: [
          { key: "imageDataUrls", value: JSON.stringify(imageDataUrls) }, // Attach the imageUrl to line items
        ],
      },
    ]);

    // Redirect to the checkout page
    window.location.href = cart.webUrl;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    // Handle error appropriately
  }
}
