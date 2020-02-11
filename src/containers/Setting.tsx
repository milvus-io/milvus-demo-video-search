import React, { useState, useContext } from "react";
import { queryContext } from "../contexts/QueryContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { baseColor } from "../utils/color";
import Logo from "./Logo.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const TITLE = 'Video Search By Image'
const SUB_TITLE = 'demo use';
const PLACEHOLDER: any = {
  name: "please input video's name",
  alias: "please input video's alias, split with ', '",
  path: "please input video'path",
  image: "please input image's path, split with ', '",
  imageDes: 'please input image description'
};
const ButtonLabel: any = {
  insert: 'Insert',
  search: "Search"
};
const Setting = (props: any) => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    setting: {
      display: "flex",
      flexDirection: "column",
      minWidth: isMobile ? "auto" : "400px",
      padding: isMobile ? "20px" : "60px 20px",
      borderWidth: "1px",
      backgroundColor: "#1F2023",
      color: "#E4E4E6",
      overflowY: "auto"
    },
    header: {
      marginBottom: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    config: {
      fontSize: "24px",
      color: "#FAFAFA"
    },
    clear: {
      color: baseColor,
      fontSize: "18px",
      cursor: "pointer"
    },
    imageSet: {},
    counts: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      color: "#FAFAFA"
    },
    currTotal: {
      fontSize: "12px"
    },
    setPath: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      marginBottom: "60px"
    },
    MolecularInput: {
      color: "blue !important"
    },
    customInput: {
      margin: "0 20px 0 0 !important",
      color: "blue !important"
    },
    customFab: {
      color: "#fff",
      backgroundColor: baseColor,
      width: "36px",
      height: "36px",
      "&:hover": {
        backgroundColor: baseColor
      }
    },
    customDeleteFab: {
      position: "absolute",
      top: "5px",
      right: "5px",
      color: "#fff",
      backgroundColor: "#666769",
      width: "24px",
      height: "24px",
      minHeight: "0px",
      "&:hover": {
        backgroundColor: "#666769"
      }
    },
    customDelete: {
      color: "#A7A7AF",
      width: "18px",
      height: "18px"
    },
    customIcon: {
      color: "#fff",
      backgroundColor: baseColor,
      width: "20px",
      height: "20px"
    },
    upload: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    benchImage: {
      width: "400px",
      height: "250px",
      position: "relative"
    },
    dropzoneContainer: {
      backgroundColor: "transparent",
      width: "250px",
      height: "250px",
      borderRadius: "10px",
      border: "solid .5px #C8C8C8",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    dropzoneText: {
      fontSize: "14px",
      color: "#B3B4B5",
      marginBottom: "30px"
    },
    notchedOutline: {
      borderWidth: ".5px",
      borderColor: "#838385 !important"
    },
    formLabel: {
      color: "#fff"
    },
    controlLabel: {
      color: "#838385"
    }
  });
  const { upload, search, queryStatus } = useContext(queryContext);
  const { setResults, loading, setLoading } = props;
  const classes = useStyles({});
  const [insertParams, setInsertParams]: any = useState({
    Name: '',
    Alias: '',
    Path: ''
  })
  const [searchParams, setSearchParams]: any = useState({
    Name: '',
    describe: '',
  })
  const [processPercent, setProcessPercent]: any = useState(0)
  const keepQueryStatus = async (id: string) => {
    setLoading(true)
    queryStatus({ id }).then((res: any) => {
      if (res && res.Stage === '') {
        setProcessPercent(res.Percent);
        setTimeout(() => {
          keepQueryStatus(id)
        }, 1000)
      } else {
        setLoading(false);
        setProcessPercent(0)
      }
    })
  }
  const _parseStrToArr = (str: string) => {
    return str.split(',')
      .filter((str: string) => !!str)
      .map((str: string) => str.trim())
  }
  const _upLoadVideo = async (params: any) => {
    const parsedAlias = _parseStrToArr(params.alias)
    params = { ...params, parsedAlias }
    upload(params).then((res: any) => {
      if (res && res.status === 200) {
        const { alias, id } = res.body;
        console.log(alias, id);
        keepQueryStatus(id)
      }
    })
  }

  const _search = (params: any) => {
    const file = _parseStrToArr(params.file);
    params = { ...params, file }
    search(params).then((res: any) => {
      const { status, data } = res || {};
      if (status === 200) {
        setResults(data)
      }
    });
  };

  return (
    <div className={classes.setting}>
      <div className={classes.header}>
        <img src={Logo} width="150px" alt="logo" />
        <h3 style={{ marginBottom: "10px" }}>{TITLE}</h3>
        {isMobile ? "" : <p>{SUB_TITLE}</p>}
      </div>
      <TextField
        classes={{ root: classes.MolecularInput }}
        label=""
        variant="outlined"
        value={insertParams.Name || ""}
        onChange={(e: any) => setInsertParams({ ...insertParams, Name: e.target.value })}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.controlLabel,
            focused: classes.controlLabel
          }
        }}
        margin="normal"
        InputProps={{
          style: {
            textAlign: "left",
            width: isMobile ? "auto" : "400px",
            height: "40px"
          },
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.formLabel
          },
          placeholder: PLACEHOLDER.name,
        }}
      />
      <TextField
        classes={{ root: classes.MolecularInput }}
        label=""
        variant="outlined"
        value={insertParams.Alias || ""}
        onChange={(e: any) => setInsertParams({ ...insertParams, Alias: e.target.value })}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.controlLabel,
            focused: classes.controlLabel
          }
        }}
        margin="normal"
        InputProps={{
          style: {
            textAlign: "left",
            width: isMobile ? "auto" : "400px",
            height: "40px"
          },
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.formLabel
          },
          placeholder: PLACEHOLDER.alias,
        }}
      />
      <TextField
        classes={{ root: classes.MolecularInput }}
        label=""
        variant="outlined"
        value={insertParams.Path || ""}
        onChange={(e: any) => setInsertParams({ ...insertParams, Path: e.target.value })}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.controlLabel,
            focused: classes.controlLabel
          }
        }}
        margin="normal"
        InputProps={{
          style: {
            textAlign: "left",
            width: isMobile ? "auto" : "400px",
            height: "40px"
          },
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.formLabel
          },
          placeholder: PLACEHOLDER.path,
        }}
      />
      <Button startIcon={<CloudUploadIcon />} variant="contained" onClick={() => _upLoadVideo(insertParams)}>{ButtonLabel.insert}</Button>
      {loading && (
        <div className={classes.imageSet}>
          <LinearProgress value={processPercent} />
        </div>
      )}

      <TextField
        classes={{ root: classes.MolecularInput }}
        label=""
        variant="outlined"
        value={searchParams.Name || ""}
        onChange={(e: any) => setSearchParams({ ...searchParams, Name: e.target.value })}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.controlLabel,
            focused: classes.controlLabel
          }
        }}
        margin="normal"
        InputProps={{
          style: {
            textAlign: "left",
            width: isMobile ? "auto" : "400px",
            height: "40px"
          },
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.formLabel
          },
          placeholder: PLACEHOLDER.image,
          onKeyPress: (e: any) => {
            if (e.key === "Enter") {
              // _search({ topK, Molecular });
            }
          }
        }}
      />
      <TextField
        classes={{ root: classes.MolecularInput }}
        label=""
        variant="outlined"
        value={searchParams.describe || ""}
        onChange={(e: any) => setSearchParams({ ...searchParams, describe: e.target.value })}
        InputLabelProps={{
          shrink: true,
          classes: {
            root: classes.controlLabel,
            focused: classes.controlLabel
          }
        }}
        margin="normal"
        InputProps={{
          style: {
            textAlign: "left",
            width: isMobile ? "auto" : "400px",
            height: "40px"
          },
          classes: {
            notchedOutline: classes.notchedOutline,
            root: classes.formLabel
          },
          placeholder: PLACEHOLDER.imageDes,
          onKeyPress: (e: any) => {
            if (e.key === "Enter") {
              // _search({ topK, Molecular });
            }
          }
        }}
      />
      <Button startIcon={<SearchIcon />} variant="contained" onClick={() => { _search(searchParams) }}>{ButtonLabel.search}</Button>
    </div>
  );
};

export default Setting;
