import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { login } from "./endpoints/login";
import { signUp } from "./endpoints/signup";
import createGenre from "./endpoints/createGenre";
import createAlbum from "./endpoints/createAlbum";
import createMusic from "./endpoints/createMusic";
import getAllGenres from "./endpoints/getAllGenres";
import getAllMusics from "./endpoints/getAllMusics";
import getUserAlbums from "./endpoints/getUserAlbums";
import getUserById from "./endpoints/getUserById";
import getMusicById from "./endpoints/getMusicById";
import getMusicByTitle from "./endpoints/getMusicByTitle";
import updateAvatar from "./endpoints/updateAvatar";
import updateAlbumCover from "./endpoints/updateAlbumCover";

 
export type Class = {
  name: string;
  start_date: Date;
  end_date: Date;
  module: number;
};

const app: Express = express();
app.use(express.json());
app.use(cors());



const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});


app.post("/user/login", login);

app.post("/user/signup", signUp);

app.post('/music/newGenre',createGenre)

app.post('/album/newAlbum',createAlbum)

app.post('/music/newMusic',createMusic)

app.get('/music/genre/all',getAllGenres)

app.get('/music/all',getAllMusics)

app.get('/user/albums',getUserAlbums)

app.get('/user/id/:user_id',getUserById)

app.get('/music/id/:music_id',getMusicById)

app.get('/music/title/:music_title',getMusicByTitle)

app.put('/user/avatar',updateAvatar)

app.put('/album/:album_id',updateAlbumCover)







// app.get("/student", getAllStudents);

// app.get("/student/age/:id", getAge);

// app.get("/student/class/:idClass", getStudentByClass);

// app.get("/teacher/class/:idClass", getTeacherByClass);

// app.get('/student/hobbie/:idHobbie', getStudentByHobbie)

// app.get('/student/:id',seeStudentHobbie)

// app.post("/teacher", createTeacher);

// app.post("/student", createStudent);

// app.post("/class", createClass);

// app.put('/class/:id', updateModule)

// app.put('/teacher/edit/:teacherId',addTeacherToClass )

// app.put('/student/edit/:studentId',addStudentToClass )

// app.delete("/student/:id", deleteStudents);

// app.delete('/class/student/:class_id/:student_id', deleteStudentClass)

// app.delete('/class/teacher/:class_id/:teacher_id', deleteTeacherClass)




