// scripts.js

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  
  const data = {
    response: {
      requestType: "FETCH_ATHLETE_DATA",
      requestBy: "ALL_MATCHING_ATHLETES",
      forDisplay: "BEST_RACES",
  
      data: {
        NM372: {
          firstName: "Nwabisa",
          surname: "Masiko",
          id: "NM372",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [9, 7, 8, 6],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [6, 7, 8, 7],
            },
          ],
        },
  
        SV782: {
          firstName: "Schalk",
          surname: "Venter",
          id: "SV782",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [10, 8, 3, 12],
            },
            {
              date: '2022-11-25T20:00:00.000Z',
              time: [6, 8, 9, 11],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [10, 11, 4, 8],
            },
            {
              date: '2022-12-09T20:00:00.000Z',
              time: [9, 8, 9, 11],
            },
          ],
        },
      },
    },
  };
  

  // Only edit below this comment

const createHtml = (athlete) => {
    const { firstName, surname, id, races } = athlete;
    //extracted information about latest race using slice
    const [latestRace] = races.slice(-1);
    const { date, time: timeAsArray } = latestRace;
  //created document fragment to hold the html elements
    const fragment = document.createDocumentFragment();
  //created H2 element for the athlete's ID and append it to fragment
    const title = document.createElement('h2');
    title.textContent = id;
    fragment.appendChild(title);
  //created a DL element to display athlete info and race details
    const list = document.createElement('dl');
  //converted the date string to a date object to extract day, month and year
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const month = MONTHS[eventDate.getMonth()];
    const year = eventDate.getFullYear();
  //calcutating the total time of the latest race
    const totalTime = timeAsArray.reduce((total, time) => total + time, 0);
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
  //constructed the HTML content for list elemnts
    list.innerHTML = /* html */ `
      <dt>Athlete</dt>
      <dd>${firstName} ${surname}</dd>
  
      <dt>Total Races</dt>
      <dd>${races.length}</dd>
  
      <dt>Event Date (Latest)</dt>
      <dd>${day} ${month} ${year}</dd>
  
      <dt>Total Time (Latest)</dt>
      <dd>${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}</dd>
    `;
  //append the list element to the fragment
    fragment.appendChild(list);
    //return fragment containing the html elements
    return fragment;
  }
  
  const athletes = Object.values(data.response.data);
  athletes.forEach(athlete => {
    const athleteElement = document.querySelector(`[data-athlete="${athlete.id}"]`);
    //check if the athlete's section exists in the DOM 
    if (athleteElement) {
      const htmlFragment = createHtml(athlete);
      athleteElement.appendChild(htmlFragment);
    }
  });
//   1. Extracted the latest race from the races array using destructuring and array slicing.
// 2. Converted the date string of the latest race to a Date object to extract day, month, and year.
// 3. Calculated the total time of the latest race by summing up the elements in the time array.
// 4. Used forEach loop to iterate over each athlete and dynamically append HTML elements to their respective athlete section in the DOM.
