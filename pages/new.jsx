import Form from "../components/Form";

const NewMovie = () => {
    const movieForm = {
        title: "",
        plot: "",
      };

      return <Form formData={movieForm} />;
}

export default NewMovie
