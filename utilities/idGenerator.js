export default function idGenerator(){
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let id ="";
    for (i = 1; i < 11; i++) {
     id += alpha[Math.round(Math.random() * 36)];
    }
    return id;
}