
export const  GetColorByIndex=({index})=>{
    // const bgcolor = {
    //     Primary: "Primary",
    //     // Secondary: "Secondary",
    //     info: "info",
    //     Light: "Light",
    //     warning: "warning",
    //     // success: "success",
    //     // Danger: "Danger",
    //     // Dark: "Dark",
    //   };
      const colors = ['#E9ECEF', '#DBF0F7', '#FDEBD1'];
      return colors[index % colors.length]
    //   const colorValues = Object.values(bgcolor);

    // return colorValues[index % colorValues.length];

}

 