import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NEXTRACE from '../../data/next-race.json';
import useUser from '../../hooks/useUser';
import { RootState } from '../../store/rootReducer';
import { getUser } from '../../store/user/actions';

const InviteCodeInput = () => {
  const dispatch = useDispatch();

  const charOneRef = useRef<HTMLInputElement>(null);
  const charTwoRef = useRef<HTMLInputElement>(null);
  const charThreeRef = useRef<HTMLInputElement>(null);
  const charFourRef = useRef<HTMLInputElement>(null);
  const charFiveRef = useRef<HTMLInputElement>(null);
  const charSixRef = useRef<HTMLInputElement>(null);

  const { token } = useSelector((state: RootState) => state.auth);

  const [codeRespMsg, setCodeRespMsg] = useState('');
  const [codeRespStatus, setCodeRespStatus] = useState(false);

  const { submitInviteCode } = useUser();

  function toggleCharFocus(
    e: React.ChangeEvent<HTMLInputElement>,
    curRef: React.RefObject<HTMLInputElement>
  ) {
    if (e.target.value !== '') {
      switch (curRef) {
        case charOneRef:
          charTwoRef.current!.focus();
          break;
        case charTwoRef:
          charThreeRef.current!.focus();
          break;
        case charThreeRef:
          charFourRef.current!.focus();
          break;
        case charFourRef:
          charFiveRef.current!.focus();
          break;
        case charFiveRef:
          charSixRef.current!.focus();
          break;
        case charSixRef:
          charSixRef.current!.blur();
          break;
        default:
          break;
      }
    }
  }

  function onKeyPressedHandler(
    e: React.KeyboardEvent<HTMLInputElement>,
    curRef: React.RefObject<HTMLInputElement>
  ) {
    if (e.key === 'Backspace') {
      switch (curRef) {
        case charTwoRef:
          e.preventDefault();
          if (charTwoRef.current!.value !== '') charTwoRef.current!.value = '';
          else {
            charTwoRef.current!.blur();
            charOneRef.current!.focus();
          }
          break;
        case charThreeRef:
          e.preventDefault();
          if (charThreeRef.current!.value !== '')
            charThreeRef.current!.value = '';
          else {
            charThreeRef.current!.blur();
            charTwoRef.current!.focus();
          }
          break;
        case charFourRef:
          e.preventDefault();
          if (charFourRef.current!.value !== '')
            charFourRef.current!.value = '';
          else {
            charFourRef.current!.blur();
            charThreeRef.current!.focus();
          }
          break;
        case charFiveRef:
          e.preventDefault();
          if (charFiveRef.current!.value !== '')
            charFiveRef.current!.value = '';
          else {
            charFiveRef.current!.blur();
            charFourRef.current!.focus();
          }
          break;
        case charSixRef:
          e.preventDefault();
          if (charSixRef.current!.value !== '') charSixRef.current!.value = '';
          else {
            charSixRef.current!.blur();
            charFiveRef.current!.focus();
          }
          break;
        default:
          break;
      }
    } else if (e.key.length === 1) {
      e.preventDefault();
      curRef.current!.value = e.key;
      switch (curRef) {
        case charOneRef:
          charTwoRef.current!.focus();
          break;
        case charTwoRef:
          charThreeRef.current!.focus();
          break;
        case charThreeRef:
          charFourRef.current!.focus();
          break;
        case charFourRef:
          charFiveRef.current!.focus();
          break;
        case charFiveRef:
          charSixRef.current!.focus();
          break;
        case charSixRef:
          charSixRef.current!.blur();
          break;
        default:
          break;
      }
    } else e.preventDefault();
  }

  async function onSubmitCodeHandler() {
    const inviteCode =
      charOneRef.current!.value +
      charTwoRef.current!.value +
      charThreeRef.current!.value +
      charFourRef.current!.value +
      charFiveRef.current!.value +
      charSixRef.current!.value;

    const codeResp = await submitInviteCode(token, inviteCode.toUpperCase());
    setCodeRespMsg(codeResp.message);
    if (codeResp.success) {
      setCodeRespStatus(true);
      setTimeout(function () {
        // @ts-ignore
        dispatch(getUser(codeResp.user));
      }, 2000);
    }
  }

  async function pasteInviteCodeHandler() {
    const text = await navigator.clipboard.readText();
    const chars = text.split('');
    charOneRef.current!.value = chars[0];
    charTwoRef.current!.value = chars[1];
    charThreeRef.current!.value = chars[2];
    charFourRef.current!.value = chars[3];
    charFiveRef.current!.value = chars[4];
    charSixRef.current!.value = chars[5];
  }

  return (
    <>
      <div className="text-white text-lg font-semibold mt-12 text-left flex">
        Enter code:{' '}
        {codeRespMsg.length > 0 && (
          <div className="flex items-center ml-2">
            <span className={codeRespStatus ? 'text-green' : 'text-redOne'}>
              {codeRespMsg}
            </span>
            <span className="ml-2">
              {codeRespStatus ? (
                <Image
                  src={require(`../../public/img/check.svg`)}
                  width={16}
                  height={16}
                />
              ) : (
                <Image
                  src={require(`../../public/img/cross.svg`)}
                  width={16}
                  height={16}
                />
              )}
            </span>
          </div>
        )}
      </div>
      <div className="mt-8 w-full flex items-center justify-center">
        <div className="border-2 border-redOne w-16 h-16 mx-2">
          <input
            autoFocus
            onKeyDown={(e) => onKeyPressedHandler(e, charOneRef)}
            onChange={(e) => toggleCharFocus(e, charOneRef)}
            ref={charOneRef}
            type="text"
            className="bg-gray w-full h-full text-white text-2xl uppercase text-center outline-none"
            maxLength={1}
          />
        </div>
        <div className="border-2 border-redOne w-16 h-16 mx-2">
          <input
            onKeyDown={(e) => onKeyPressedHandler(e, charTwoRef)}
            onChange={(e) => toggleCharFocus(e, charTwoRef)}
            ref={charTwoRef}
            type="text"
            className="bg-gray w-full h-full text-white text-2xl uppercase text-center outline-none"
            maxLength={1}
          />
        </div>
        <div className="border-2 border-redOne w-16 h-16 mx-2">
          <input
            onKeyDown={(e) => onKeyPressedHandler(e, charThreeRef)}
            onChange={(e) => toggleCharFocus(e, charThreeRef)}
            ref={charThreeRef}
            type="text"
            className="bg-gray w-full h-full text-white text-2xl uppercase text-center outline-none"
            maxLength={1}
          />
        </div>
        <div className="border-2 border-redOne w-16 h-16 mx-2">
          <input
            onKeyDown={(e) => onKeyPressedHandler(e, charFourRef)}
            onChange={(e) => toggleCharFocus(e, charFourRef)}
            ref={charFourRef}
            type="text"
            className="bg-gray w-full h-full text-white text-2xl uppercase text-center outline-none"
            maxLength={1}
          />
        </div>
        <div className="border-2 border-redOne w-16 h-16 mx-2">
          <input
            onKeyDown={(e) => onKeyPressedHandler(e, charFiveRef)}
            onChange={(e) => toggleCharFocus(e, charFiveRef)}
            ref={charFiveRef}
            type="text"
            className="bg-gray w-full h-full text-white text-2xl uppercase text-center outline-none"
            maxLength={1}
          />
        </div>
        <div className="border-2 border-redOne w-16 h-16 mx-2">
          <input
            onKeyDown={(e) => onKeyPressedHandler(e, charSixRef)}
            onChange={(e) => toggleCharFocus(e, charSixRef)}
            ref={charSixRef}
            type="text"
            className="bg-gray w-full h-full text-white text-2xl uppercase text-center outline-none"
            maxLength={1}
          />
        </div>
        <button
          onClick={pasteInviteCodeHandler}
          className="mx-2 border-2 border-black bg-gradient-to-r from-redOne to-redTwo rounded-lg px-3.5 py-2 text-white text-sm font-semibold"
        >
          Paste
        </button>
      </div>
      <h1 className="text-white text-lg font-semibold mt-8">
        Welcome to the {NEXTRACE.name}! Please enter the invite code to back
        your favorite driver and constructor.
      </h1>
      <button
        className="mt-12 border-2 border-black bg-gradient-to-r from-redOne to-redTwo rounded-lg w-56 py-2.5 text-white text-lg font-bold"
        onClick={onSubmitCodeHandler}
      >
        Let&apos;s go!
      </button>
    </>
  );
};

export default InviteCodeInput;
