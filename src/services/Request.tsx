import axios, { AxiosRequestConfig } from 'axios';
import { RequestOptions } from '@/Datatypes/interfaces';
import Cookies from 'js-cookie';
import { ApiEndpoint } from '@/apis/apiEndpoints';

const Request = async ({ endpointId, slug, data, headers, params }: RequestOptions) => {
  // Define the path to the API endpoints file
  
  const storedAccessToken = Cookies.get('access');  // Retrieve stored access token
  const endpoint = ApiEndpoint[endpointId];

  if (!endpoint) {
    throw new Error(`Invalid API endpoint: ${endpointId}`);
  }

  let fullUrl = endpoint.url;
  if (slug) {
    fullUrl += `${slug}`;  // Append additional slug to URL if provided
  }

  const axiosConfig: AxiosRequestConfig = {
    method: endpoint.method,
    url: fullUrl,
    headers: {
      ...endpoint.headers,
      // Use the appropriate Authorization header based on the endpoint type
      Authorization: endpoint.withAuth ? `Bearer ${storedAccessToken}` : undefined
    },
    params: params  // Add query parameters if provided
  };

  // Check and set appropriate data for non-GET requests
  if (endpoint.method !== 'GET') {
    axiosConfig.data = data;
  }

  try {
    const response = await axios(axiosConfig);

    // Log response data for debugging
    console.log("Response Data:", response.data);

    // Handle unsuccessful response
    if (response.status < 200 || response.status >= 300) {
      const errorText = response.data?.error || response.data?.message || endpoint.errorMessage || "Unexpected error occurred.";
      throw new Error(errorText);
    }

    // Show success message if the response is successful
    if (endpoint?.successMessage) {
          console.log(endpoint.successMessage);
    }

    return response.data;  // Return the response data for further processing
  } catch (error) {
    if (endpoint?.errorMessage) {
      console.error(endpoint?.errorMessage);
    }

    console.error("Request error:", error);
    throw error;  // Re-throw the error for further handling
  }
};

export default Request;
