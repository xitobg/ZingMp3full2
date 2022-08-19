import React, { useCallback, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AlbumItem, Loading } from "../../components";
import httpService from "../../Services/http.service";
import { actions } from "../../store";
import styles from "./NewSong.module.scss";

export default function NewSong() {
  const dispatch = useDispatch();
  const { blackHeader } = useSelector((state) => state);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleScroll = useCallback(
    (e) => {
      if (e.target.scrollTop > 0) {
        !blackHeader && dispatch(actions.setBGHeader(true));
      } else {
        blackHeader && dispatch(actions.setBGHeader(false));
      }
    },
    [blackHeader, dispatch]
  );

  useEffect(() => {
    const axiosNewSong = () => {
      setLoading(true);
      httpService.getNewSong().then((res) => {
        const { data } = res.data;
        setData(data);
        setLoading(false);
      });
    };
    axiosNewSong();
  }, []);
  if (loading) {
    return <Loading size={50} />;
  }
  const { items } = data;
  return (
    <div className={styles.container} onScroll={handleScroll}>
      <div className={styles.wrap}>
        <div className={styles.blur}></div>
        <div className={styles.alpha}></div>
        <div className={styles.alpha1}></div>
        <div className={styles.main}>
          <h5>
            Nhạc mới{" "}
            <button>
              <AiFillPlayCircle />
            </button>
          </h5>
          <div className={styles.newSongList}>
            {items.map((item, index) => {
              const { encodeId, streamingStatus, isWorldWide } = item;
              return (
                <AlbumItem
                  key={encodeId}
                  status={streamingStatus}
                  worldWide={isWorldWide}
                  data={item}
                  index={index}
                  listSong={items}
                  newSong={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
