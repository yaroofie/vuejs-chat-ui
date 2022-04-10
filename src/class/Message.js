export default class message
{
   id;
   sender;
   type;
   status;
   message;
   date;
   time;
   reply;
   attachments;
   color;
   
   _isMe = false;
   _hideUser = false;
   _position = "";
   _reply;

   constructor( id, sender, type, status, message, date, time, reply,attachments = [] )
   {
      this.id = id;
      this.sender = sender;
      this.type = type;
      this.status = status;
      this.message = message;
      this.date = date;
      this.time = time;
      this.reply = reply;
      this.color = "";
      this.attachments = attachments;
   }

   setColor ( color )
   {
      this.color = color;
   }

   isMe ()
   {
      this._isMe = true;
   }

   hideUser ()
   {
      this._hideUser = true;
   }

   setPostion ( pos )
   {
      this._position = pos;
   }

   getPosition ()
   {
      return this._position;
   }

   setReply ( reply )
   {
      this.reply = reply.id;
      this._reply = reply;
   }
}