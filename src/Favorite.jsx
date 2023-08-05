export default function Favorite(props) {
  return (
    <div>
      <div className='favorite-section'>
        <div className='favorite-info'>
          <ion-icon
            name='trash-outline'
            className='trash'
            onClick={props.deleteFavorite}
          ></ion-icon>
          <img src={props.randomImage} alt='meme' className='meme--image' />
          <h2 className='favorite-text top'>{props.topText}</h2>
          <h2 className='favorite-text bottom'>{props.bottomText}</h2>
        </div>
      </div>
    </div>
  );
}
