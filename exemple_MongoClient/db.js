let MongoClient = require("mongodb").MongoClient;
const DB_CONSTS = require("./env");

let client; // Client Mongo
let collection;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connect(url = DB_CONSTS.DB_URL) {
  try {
    client = await MongoClient.connect(url, options);
    collection = client.db(DB_CONSTS.DB_DB).collection(DB_CONSTS.DB_COLLECTION);
    return client;
  } catch {
    console.error("CONNECTION ERROR. TRY AGAIN");
    return null;
  }
}

async function openConnection() {
  await connect();
}

function closeConnection() {
  client.close();
}

async function getAllCourses() {
  await openConnection();
  const courses = await collection.find({}).toArray();
  closeConnection();
  return courses;
}

async function getCoursesBySigle(sigle) {
  await openConnection();
  const query = { sigle: sigle };
  const courses = await collection.find(query).toArray();
  closeConnection();
  return courses;
}

async function getSortedCourses(ascending) {
  await openConnection();
  const sortCriteria = { credits: ascending ? 1 : -1 };
  const courses = await collection.find({}).sort(sortCriteria).toArray();
  closeConnection();
  return courses;
}

async function addCourse(course) {
  await openConnection();
  await collection.insertOne(course);
  closeConnection();
}

async function deleteCourse(sigle, deleteAll) {
  await openConnection();
  const filter = { sigle: sigle };
  if (deleteAll) {
    await collection.deleteMany(filter);
  } else {
    await collection.deleteOne(filter);
  }
  closeConnection();
}

async function deleteAll() {
  await openConnection();
  await collection.deleteMany({});
  closeConnection();
}

async function modifyCourse(sigle, newCredits) {
  await openConnection();
  const filter = { sigle: sigle };
  const setQuery = { $set: { credits: newCredits } };
  await collection.updateOne(filter, setQuery);
  closeConnection();
}

async function main() {
  // await getCoursesExample();
  // await addNewCourseExample();
  // await modifyCourseExample();
  await deleteCourseExample();
}

async function getCoursesExample() {
  await populateDB(); // données fictives
  console.log("=====TOUS LES COURS DE LA COLLECTION=====");
  const allCourses = await getAllCourses();
  console.log(allCourses);

  console.log("=====COURS LOG2440=====");
  const log4420Courses = await getCoursesBySigle("LOG2440");
  console.log(log4420Courses);

  console.log("=====COURS TRIÉS PAR CREDITS EN ORDRE DESCENDANT=====");
  const sortedCoursesDesc = await getSortedCourses(true);
  console.log(sortedCoursesDesc);

  console.log("=====COURS TRIÉS PAR CREDITS EN ORDRE ASCENDANT=====");
  const sortedCoursesAsc = await getSortedCourses(false);
  console.log(sortedCoursesAsc);
}

async function addNewCourseExample() {
  await populateDB();
  let allCourses = await getAllCourses();
  console.log(`IL Y A : ${allCourses.length} DOCUMENTS DANS LA COLLECTION`);
  const newCourse = { sigle: "INF3500", credits: 3, responsable: "Pierre Langlois" };
  await addCourse(newCourse);
  console.log("COURS AJOUTÉ", newCourse);
  allCourses = await getAllCourses();
  console.log(`IL Y A : ${allCourses.length} DOCUMENTS DANS LA COLLECTION`);
}

async function modifyCourseExample() {
  await deleteAll();

  const sigle = "INF1015";
  const newCredits = 6;
  const course = { sigle: sigle, credits: 4 };

  await addCourse(course);
  let newCourse = (await getCoursesBySigle(sigle))[0];
  console.log(`LE COURS ${newCourse.sigle} A INITIALEMENT ${newCourse.credits} credits`);

  await modifyCourse(sigle, newCredits);
  newCourse = (await getCoursesBySigle(sigle))[0];
  console.log(`LE COURS ${newCourse.sigle} A MAINTENANT ${newCourse.credits} credits`);
}

async function deleteCourseExample() {
  await populateDB();
  const sigle = "INF8480";
  const newCourse = { sigle: sigle, credits: 3 };
  await addCourse(newCourse);

  let allCourses = await getAllCourses();
  console.log(`IL Y A : ${allCourses.length} DOCUMENTS DANS LA COLLECTION`);
  await deleteCourse(sigle, false);
  console.log("COURS SUPPRIMÉ", newCourse);
  allCourses = await getAllCourses();
  console.log(`IL Y A : ${allCourses.length} DOCUMENTS DANS LA COLLECTION`);
}

async function populateDB() {
  await deleteAll();
  await addCourse({ sigle: "LOG2440", credits: 3 });
  await addCourse({ sigle: "MTH1102", credits: 2 });
  await addCourse({ sigle: "LOG3900", credits: 4 });
}

main();
