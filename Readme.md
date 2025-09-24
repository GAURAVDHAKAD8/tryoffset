I built the project in React and kept the design simple and easy to use. I used a gray background with light green accents to give it a natural look. Each credit is shown as a card with an image, project details, and a status badge. On mobile, the cards stack one below the other with smaller text so it's easy to read.

The download button works only for retired credits and is disabled for active ones, so users can only download certificates when they are available. To handle many credits, I planned to use pagination or infinite scrolling so the dashboard stays fast.

  
Website link: https://tryoffset-rn4g.vercel.app/

{note:  I also added images in the credit cards to make them more visually appealing.}

1. How did you decide what to show on the main page vs details?
 
I decided to show only the essential info on the main page so users can quickly see all credits. This includes the project name, UNIC ID, vintage, status, and an image. The download button is always visible, but users can only download the certificate when the status is “Retired.” This keeps the interface simple while still providing access to the certificate when available.

3. What design choices did you make to keep it clean?

I chose a gray background with light green highlights to give a natural, fresh look. Each credit is shown in a card with spacing and rounded corners to keep things organized. On mobile, cards stack vertically and the text is smaller for better readability. I also added images in the credit cards to make them more visually appealing.

5. If the system had 10,000 credits, how would you keep the dashboard fast?
   
If there were a large number of credits, I would implement pagination or infinite scrolling so the page doesn’t load everything at once. This keeps the dashboard fast and smooth to use, even with thousands of credits.
