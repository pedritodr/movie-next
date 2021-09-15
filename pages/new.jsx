import Form from "../components/Form";

const NewMovie = () => {
    const movieForm = {
        title: "",
        plot: "",
      };

      return <Form movieForm={movieForm} />;
}

export default NewMovie
