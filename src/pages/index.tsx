import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useMediaQuery } from 'react-responsive'

import React from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const triggerApiRequest = () => {
    // Disable the button to prevent multiple clicks
    setIsButtonDisabled(true);

    // Make a request to the API using Axios
    axios.get("https://easy-openly-skunk.ngrok-free.app/create-offer-sample")
      .then(response => {
        // Extract the long URL from the API response
        const fetchedLongUrl = response.data.invitationUrl;
        console.log(fetchedLongUrl)
        // Update the state with the long URL
        setLongUrl(fetchedLongUrl);

        // Enable the button after successful fetch
        setIsButtonDisabled(false);
      })
      .catch(error => {
        console.error("Error fetching data from the API:", error);

        // Enable the button in case of an error
        setIsButtonDisabled(false);
      })
  }
  const openDeepLink = () => {
    // Use the 'intent' URL scheme for Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    const link = isAndroid ? `intent://${longUrl}#Intent;end` : longUrl;

    window.location.href = link;
  };

  return (
    <Box>

      <a href={longUrl} target="_blank" rel="noreferrer" >deep link {isMobile}</a>
      <Button onClick={triggerApiRequest} isLoading={isButtonDisabled} > Click</Button>
      <Button onClick={openDeepLink}>Open Deep Link</Button>
    </Box>
  )
}
