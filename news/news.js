const newslist = document.querySelector("#newslist");
let newsbody =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque ut veniam laboriosam facilis ducimus voluptatibus minus ex? Eius illum, veniam quia vitae nulla, sapiente non sed adipisci possimus iure recusandae cumque rem, excepturi nisi debitis est neque molestiae provident! A assumenda consequatur autem cum pariatur. Veritatis corporis voluptas blanditiis dolore eveniet ut, natus omnis commodi ipsam eius assumenda itaque labore dolorem totam laborum reiciendis explicabo magni optio quisquam. Esse alias, ipsum odit quibusdam veritatis minima quia autem ex sed libero tenetur dolor totam, magni officiis perspiciatis rerum accusamus. Inventore quasi error quia est obcaecati unde expedita? Laboriosam deleniti at nihil deserunt iure, maxime fuga, quis distinctio repellendus consequuntur suscipit temporibus minima dolor nobis ducimus eaque, possimus eius ullam porro.";

const url =
  "https://newsi-api.p.rapidapi.com/api/category?category=world&language=en&country=us&sort=top&page=1&limit=20";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b2e78afcbamsh9c50e9536ffa1f3p1c737bjsn9abdc7ff3137",
    "X-RapidAPI-Host": "newsi-api.p.rapidapi.com",
  },
};

async function getnews() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    result?.map((el) => {
      const newsdiv = `
        <div>
          <img src=${
            el.image
              ? el.image
              : "https://t4.ftcdn.net/jpg/05/62/07/87/360_F_562078740_j9VukIdJatn6IeX0SaraBr0L4BnjjNsp.webp"
          } alt=${el.id} />
          <h1>“${el.title}”</h1>
          <div>
            <span>Date: ${el.publishedAt}</span>
            <span>SourceName: ${el.sourceName}</span>
          </div>
          <p>${
            el.body ? el.body.substring(0, 500) : newsbody.substring(0, 500)
          }...</p>
        </div>
      `;
      newslist.insertAdjacentHTML("afterbegin", newsdiv);
    });

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
getnews();

// console.log(getnews().then((news) => console.log(news)));
