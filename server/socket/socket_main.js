let socketIo = require("socket.io");


exports.createSocket = (_server) => {
  // מול איזה שרת הוא עובד ולאיזה דומיינים יש הרשאה 
  // לשלוח לו אירועים
  let io = socketIo(_server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

   // מאזין להתחברות ראשונית מהצד לקוח שנקרא קונקשיין
  // ואז נמצא במצב המתנה לאירועים שנרשום לו
  io.on('connection', socket => {

    // מאזין לאירוע מהצד לקוח של שליחת הודעה לצ'ט
   // מקבל גם הודעה וגם איי די של המשתמש
    socket.on('clientInput', ({ message,user_id }) => {

       // ומחזיר לכל המשתמשים בצד לקוח שמאזינים את ההודעה שהתקבלה
      io.emit('socketEvent', { message,user_id })
    })
  })
}
