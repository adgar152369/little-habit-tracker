// import { plugins } from "chart.js";

let successChart;

export default function generateSuccessChart(habit) {

  if (successChart) successChart.destroy();

  const ctx = document.getElementById('successChart');
  const selectedHabit = habit;
  const completedDays = selectedHabit.completedDays.length; // Get the number of completed days
  const creationDay = new Date(selectedHabit.createdDate).getDate();

  // const numDaysOfHabit = selectedHabit.currentDay - creationDay;
  const daysSinceCreation = [];
  for (let i = creationDay; i <= selectedHabit.currentDay; i++) {
    daysSinceCreation.push(i);
  }

  // get number of missed days since creation
  const missedDays = daysSinceCreation.filter(day => {
    if (!selectedHabit.completedDays.includes(day) && !isSameDay(day, new Date())) {
      return day;
    }
  });

  selectedHabit.missedDays = missedDays;

  const chartData = {
    labels: ['Completed', 'Missed'],
    datasets: [{
      label: ' # of days',
      data: [completedDays, missedDays.length],
      backgroundColor: ['#00AFB9', '#36454F'], // Green for completed, gray for remaining
      borderWidth: 0
    }]
  };

  const plugin = {
    id: 'emptyChart',
    afterDraw(chart, args, options) {
      const { datasets } = chart.data;
      let hasData = false;

      for (let dataset of datasets) {
        //set this condition according to your needs
        if (dataset.data.length > 0 && dataset.data.some(item => item !== 0)) {
          hasData = true;
          break;
        }
      }

      if (!hasData) {
        const { chartArea: { left, top, right, bottom }, ctx } = chart;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        chart.clear();
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,.25)';
        ctx.fillText('No data yet', centerX, centerY);
        ctx.restore();
      }
    }
  };



  successChart = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
    plugins: [plugin],
    options: {
      cutout: 90,
      title: {
        display: false,
        text: 'Overall Activity'
      }
    },
    defaults: {
      backgroundColor: '#fff'
    },
  });
}

function isSameDay(date1, date2) {
  return (
    date1 === date2.getDate()
  );
}
