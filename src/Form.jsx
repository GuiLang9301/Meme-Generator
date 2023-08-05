import React from "react";
import Favorite from "./Favorite";
import { nanoid } from "nanoid";
export default function Form() {
  //q:why the delete function will just delete all arrays
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    id: nanoid(),
  });
  console.log(meme);
  const [allMemes, setAllMemes] = React.useState([]);

  const [favoriteMeme, setFavoriteMeme] = React.useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favoriteMeme));
  }, [favoriteMeme]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getImage() {
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNum].url;

    setMeme((prevMeme) => ({ ...prevMeme, randomImage: url }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }

  function saveFavorite() {
    const favorite = {
      id: nanoid(),
      topText: meme.topText,
      bottomText: meme.bottomText,
      randomImage: meme.randomImage,
    };

    setFavoriteMeme((prev) => [...prev, favorite]);
  }
  const favoriteElements = favoriteMeme.map((favorite) => (
    <Favorite
      randomImage={favorite.randomImage}
      topText={favorite.topText}
      bottomText={favorite.bottomText}
      key={favorite.id}
      deleteFavorite={() => deleteFavorite(favorite.id)}
    />
  ));

  function deleteFavorite(id) {
    setFavoriteMeme((prev) => prev.filter((favorite) => favorite.id !== id));
  }


  return (
    <>
      <main>
        <div className='form'>
          <input
            type='text'
            placeholder='Top text'
            className='inputLeft'
            onChange={handleChange}
            name='topText'
            value={meme.topText}
          />
          <input
            type='text'
            placeholder='Bottom text'
            className='inputRight'
            onChange={handleChange}
            name='bottomText'
            value={meme.bottomText}
          />
          <button className='button' type='submit' onClick={getImage}>
            Get a new meme images
          </button>
        </div>

        <div className='meme'>
          <ion-icon
            name='bookmark-outline'
            onClick={() => saveFavorite(meme.id)}
          ></ion-icon>

          <img src={meme.randomImage} className='meme--image' />
          <h2 className='meme--text top'>{meme.topText}</h2>
          <h2 className='meme--text bottom'>{meme.bottomText}</h2>
        </div>
      </main>
      <h1 className='favorite-title'>Favorite</h1>
      {favoriteElements}
    </>
  );
}
