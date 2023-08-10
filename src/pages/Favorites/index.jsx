import Button from "componentes/Button";
import Header from "componentes/Header";
import { useFavoriteContext } from "contexts/Favorites";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { favItems, isFavorite } = useFavoriteContext();
    const navigate = useNavigate();
    const handleClick = () => navigate("/");

    return (
        <>
            {favItems.length === 0 ? (
                <section className="gap-6 flex items-center pt-4 flex flex-col items-center m-auto">
                    <Header corTexto="rosa">
                        Você ainda não favoritou nenhum produto!
                    </Header>
                    <p className="text-center text-lg text-cinza-06">
                        Facilite sua busca! Comece a favoritar nossos produtos e
                        tenha todos os itens de seu interesse no mesmo lugar.
                    </p>
                    <div className="rounded-t-lg w-full ">
                        <img
                            className="rounded-b-lg m-auto h-[250px] bg-amarelo-02"
                            src="../img/ilustracoes/gatos_caixa.svg"
                            alt="Gato branco brincando com um novelo de lã amarelo"
                        />
                    </div>
                    <Button classBtn="rosa" onclick={handleClick}>
                        Explorar produtos
                    </Button>
                </section>
            ) : (
                {favItems}
            )}
        </>
    );
};

export default Favorites;