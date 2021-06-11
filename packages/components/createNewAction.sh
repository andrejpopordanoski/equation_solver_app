#!/bin/sh


# if [[ -z ${n1} ]]; then
# 	echo 'Did not get first argument [CONSTANT NAME]
# Call script with args [CONSTANT NAME] [API RELATIVE URL]
#     '
# 	exit -1
# fi

# if [[ -z $2 ]]; then
#         echo 'Did not get second argument [API RELATIVE URL]'
#         exit -1
# fi
develop=0

read -p "Enter redux constant name: " n1
read -p "Enter relative API path: " n2
read -p "Enter api params separated with ',', if no args leave blank: " n3
read -p "Enter reducer(state) name: " n4
read -p "Enter action name: " n5
read -p "Is the action a post request [y/n]: " p1

if [[ $p1 = "y" ]]; then
    read -p "Do you want data sent as FormData [y/n]" p2
fi


 


# display back 3 numbers - punched by user. 

echo "Script will execute, creating constant $n1 and api url $n2,
 with params $n3, reducer state name $n4, action name $n5"

read -p "Type y/n to continue or exit: " n6

if [[ $n6 == "n" ]]; then
    echo "Exiting without saving"
    exit -1
fi

echo "If this script ends up with gsed fail, install gsed with brew install gnu-sed"

importConstant="// created with createNewAction.sh\nimport {\n    ${n1},\n} from \'components/src/redux/constants/main.constants\';"

importApi="// created with createNewAction.sh\nimport {\n    ${n1}_API,\n} from \'components/src/services/api\';"


reducerLine="// created with createNewAction.sh\n${n4}: basicReducer(${n1}),"

# echo ${wc -l ./src/redux/reducers/index.ts}

reduxFileLines=`wc -l ./src/redux/reducers/index.ts | awk '{ print $1 }'`

lineToSave=$(($reduxFileLines + 2))

echo $lineToSave

startLine=1

if [[ $develop -eq 0 ]]; then
    echo "// created with createNewAction.sh
export const ${n1} = {
    entity: '${n1}',
    action: Action.HANDLE,
};" >> ./src/redux/constants/main.constants.ts

    if [[ $p2 != 'y' ]]; then
        apiConst="// created with createNewAction.sh
export const ${n1}_API = (${n3}) => '${n2}"

        echo "${apiConst}"

        if [ -z "$n3" ];then
            apiConst="${apiConst}'"
        fi

        varTemp=$n3

        IFS=',' #setting comma as delimiter 
        read -a ADDR <<<"$varTemp" #reading str as an array as tokens separated by IFS  
        # readarray -d , -t ADDR <<<"$n3" #split a string based on the delimiter ':' 
        for i in "${!ADDR[@]}"; #accessing each element of array  
            do 
            if [[ $i -eq 0 ]]; then
                apiConst="${apiConst}?${ADDR[$i]}=' + ${ADDR[$i]}" 
            else
                apiConst="${apiConst} + '&&${ADDR[$i]}=' + ${ADDR[$i]}" 
            fi 
        done 

        apiConst="${apiConst};"
    else
        apiConst="// created with createNewAction.sh
export const ${n1}_API = () => '${n2}';"
    fi

    echo "${apiConst}" >> ./src/services/api.ts

    gsed -i "$startLine i $importApi"  ./src/redux/actions/data.actions.ts
    gsed -i "$startLine i $importConstant"  ./src/redux/actions/data.actions.ts
    gsed -i "$startLine i $importConstant"  ./src/redux/reducers/index.ts
    gsed -i "$lineToSave i $reducerLine"  ./src/redux/reducers/index.ts

    if [[ $p1 == 'n' ]]; then
        echo "// created with createNewAction.sh
export const ${n5} = (${n3}) => async (dispatch: any) => {
    getAction(dispatch, ${n1}, ${n1}_API(${n3}));
};" >> ./src/redux/actions/data.actions.ts
    else 
        if [[ $p2 != 'y' ]]; then
            
        echo "// created with createNewAction.sh
export const ${n5} = (${n3}) => async (dispatch: any) => {
    postAction(dispatch, ${n1}, ${n1}_API(${n3}), undefined);
};" >> ./src/redux/actions/data.actions.ts
        else
            formDataAction="// created with createNewAction.sh
export const ${n5} = (${n3}) => async (dispatch: any) => {
    const data = new FormData();
    "
            varTemp=$n3
            IFS=',' #setting comma as delimiter 
            read -a ADDR <<<"$varTemp" #reading str as an array as tokens separated by IFS  

            for i in "${ADDR[@]}"; #accessing each element of array  
                do 
                formDataAction="${formDataAction}
data.append('${i}', ${i});"
            done  

            formDataAction="${formDataAction}
    postAction(dispatch, ${n1}, ${n1}_API(), data);
};" 
            echo "${formDataAction}" >> ./src/redux/actions/data.actions.ts

        fi
            
    fi
fi

echo "Changes made in /services/api.ts, actions/data.actions.ts, redux/reducers/index.ts, redux/constants/main.constants.ts"
echo "New changes tagged with 'created with createNewAction.sh', please use the links above or search comments to fix issues"

