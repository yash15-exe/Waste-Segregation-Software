const Waste = require("../Model/wasteModel");
const emailSender = require("./emailSender");
function mailBuddy(receiver) {
  const subject = "limit reached";

  let emailSent160 = false;
  let emailSent180 = false;
  let emailSent1100 = false;
  let emailSent260 = false;
  let emailSent280 = false;
  let emailSent2100 = false;
  let emailSent360 = false;
  let emailSent380 = false;
  let emailSent3100 = false;
  let emailSent460 = false;
  let emailSent480 = false;
  let emailSent4100 = false;
  let emailSent560 = false;
  let emailSent580 = false;
  let emailSent5100 = false;
  let emailSent660 = false;
  let emailSent680 = false;
  let emailSent6100 = false;

  //setInterval(()=>checkLimitSendEmail(),1000)

  async function checkLimitSendEmail(limit, type, typeSent, text) {
    const count =  await Waste.countDocuments({ type: `${type}` });
    console.log(count);
    console.log(typeSent);
    if (count >= limit && !typeSent) {
      emailSender(receiver, subject, text);
      //console.log(typeSent);
      return true;
    } else {
      return typeSent;
    }
  }

  async function final() {
    emailSent160 = await checkLimitSendEmail(
      60,
      1,
      emailSent160,
      "60 percent storage filled of Type 1"
    );
    emailSent180 = await checkLimitSendEmail(
      80,
      1,
      emailSent180,
      "80 percent storage filled of Type 1"
    );
    emailSent1100 = await checkLimitSendEmail(
      100,
      1,
      emailSent1100,
      "100 percent storage filled of Type 1"
    );

    emailSent260 = await checkLimitSendEmail(
      60,
      2,
      emailSent260,
      "60 percent storage filled of Type 2"
    );
    emailSent280 = await checkLimitSendEmail(
      80,
      2,
      emailSent280,
      "80 percent storage filled of Type 2"
    );
    emailSent2100 = await checkLimitSendEmail(
      100,
      2,
      emailSent2100,
      "100 percent storage filled of Type 2"
    );

    emailSent360 = await checkLimitSendEmail(
      60,
      3,
      emailSent360,
      "60 percent storage filled of Type 3"
    );
    emailSent380 = await checkLimitSendEmail(
      80,
      3,
      emailSent380,
      "80 percent storage filled of Type 3"
    );
    emailSent3100 = await checkLimitSendEmail(
      100,
      3,
      emailSent3100,
      "100 percent storage filled of Type 3"
    );

    emailSent460 = await checkLimitSendEmail(
      60,
      4,
      emailSent460,
      "60 percent storage filled of Type 4"
    );
    emailSent480 = await checkLimitSendEmail(
      80,
      4,
      emailSent480,
      "80 percent storage filled of Type 4"
    );
    emailSent4100 = await checkLimitSendEmail(
      100,
      4,
      emailSent4100,
      "100 percent storage filled of Type 4"
    );

    emailSent560 = await checkLimitSendEmail(
      60,
      5,
      emailSent560,
      "60 percent storage filled of Type 5"
    );
    emailSent580 = await checkLimitSendEmail(
      80,
      5,
      emailSent580,
      "80 percent storage filled of Type 5"
    );
    emailSent5100 = await checkLimitSendEmail(
      100,
      5,
      emailSent5100,
      "100 percent storage filled of Type 5"
    );

    emailSent660 = await checkLimitSendEmail(
      60,
      6,
      emailSent660,
      "60 percent storage filled of Type 6"
    );
    emailSent680 = await checkLimitSendEmail(
      80,
      6,
      emailSent680,
      "80 percent storage filled of Type 6"
    );
    emailSent6100 = await checkLimitSendEmail(
      100,
      6,
      emailSent6100,
      "100 percent storage filled of Type 6"
    );
  }
  setInterval(() => final(), 10000);
}

module.exports = mailBuddy;
