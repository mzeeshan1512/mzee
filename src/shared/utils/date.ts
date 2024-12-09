const getDateTimeString = (dateTime: any) => {
  const date = new Date(dateTime);
  return `${date?.toDateString()} - ${date?.toTimeString()}`;
};

const gradients = {
  morning: "linear-gradient(45deg, #FFD700, #FF8C00)", // Gold to Dark Orange
  afternoon: "linear-gradient(45deg, #ADD8E6, #1E90FF)", // Light Blue to Dodger Blue
  evening: "linear-gradient(45deg, #FF6347, #FF4500)", // Tomato to Orange Red
  night: "linear-gradient(45deg, #2F4F4F, #00008B)", // Dark Slate Gray to Dark Blue
}

const getGreetingAndDateTime=(showSeconds?:boolean)=> {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const optionsDate:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, optionsDate);

  let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  if(showSeconds){
    formattedTime +=`:${seconds.toString().padStart(2, '0')}`
  }

  // Determine greeting
  let greeting,color;
  if (hours < 6) {
    greeting = 'Good Night';
    color = gradients.night
  } else if (hours < 12) {
    greeting = 'Good Morning';
    color = gradients.morning
  } else if (hours < 18) {
    greeting = 'Good Afternoon';
    color = gradients.afternoon
  } else {
    greeting = 'Good Evening';
    color = gradients.evening
  }

  return { greeting, date: formattedDate, time: formattedTime, color };
}

export {
    getDateTimeString, 
    getGreetingAndDateTime
}