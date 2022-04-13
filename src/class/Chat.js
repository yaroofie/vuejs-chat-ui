export default class
{
   constructor( id, type, subject, image, description = null, participants = [], messages = [] )
   {
      this.id = id;
      this.type = type;
      this.subject = subject;
      this.image = image;
      this.description = description;
      this.participants = participants;
      this.messages = messages;
   }
}