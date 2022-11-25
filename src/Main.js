import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

function Main() {
  const [quotes, setquotes] = useState([]);
  const [currency, setcurrency] = useState([]);
  const [author, setAuthor] = useState("");
  const [id, setid] = useState("");
  const [quote, setQuote] = useState("");

  const getCurrency = async () => {
    const res = await axios.get(
      "https://poqjtfm3vj326aorcdyxhai3hu0lxcsd.lambda-url.ap-northeast-1.on.aws/"
    );
    setcurrency(res.data.rates);
  };

  const getQuotes = async () => {
    const res = await axios.get(`https://b1-app.herokuapp.com`);
    setquotes(res.data);
  };

  const newQuote = async () => {
    await axios
      .post(`https://b1-app.herokuapp.com/post`, {
        author: author,
        quote: quote,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  const delQuote = async () => {
    await axios.delete(`https://b1-app.herokuapp.com/delete`, {});
    window.location.reload();
  };

  const editQuote = async () => {
    await axios
      .put(`https://b1-app.herokuapp.com/put`, {
        author: author,
        quote: quote,
        id: id,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getQuotes();
    getCurrency();
  }, []);
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-evenly"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"centre"}
        >
          <TextField
            label="Author"
            variant="standard"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ marginBottom: "1rem" }}
            autoFocus
          />

          <TextField
            label="Quote"
            variant="standard"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            sx={{ marginBottom: "1rem" }}
            autoFocus
          />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <Button variant={"outlined"} onClick={newQuote}>
              Add Quote
            </Button>
          </Box>

          <TextField
            label="id"
            variant="standard"
            value={id}
            onChange={(e) => setid(e.target.value)}
            sx={{ marginBottom: "1rem" }}
            autoFocus
          />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <Button variant={"outlined"} onClick={editQuote}>
              Edit Quote Instead
            </Button>
          </Box>

          <Typography sx={{ marginTop: "10rem" }}>
            One SGD dollar can buy
          </Typography>
          <Typography sx={{ marginTop: "2rem" }}>
            {currency["USD"]} US Dollar
          </Typography>
          <Typography sx={{ marginTop: "2rem" }}>
            {currency["EUR"]} Euro
          </Typography>
          <Typography sx={{ marginTop: "2rem" }}>
            {currency["JPY"]} Japanese Yen
          </Typography>
        </Box>
        <Box sx={{ width: 600 }}>
          <Paper
            style={{
              minHeight: 700,
              maxHeight: 700,
              overflow: "auto",
              overflowY: "scroll",
            }}
          >
            {quotes.map((item) => {
              return (
                <Card variant="outlined" key={item.id}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      id: {item.id}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {item.quote}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Author: {item.author}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Paper>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <Button variant={"outlined"} onClick={delQuote}>
              Delete last Quote
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
